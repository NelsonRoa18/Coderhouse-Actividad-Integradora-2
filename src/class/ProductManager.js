import productModel from '../models/products.model.js';

class ProductManager {
    constructor() {

    }
    async getProducts() {
        //Metodo para obtener todos los productos
        try {
            const options = {
                page: 1,
                limit: 30,
                lean: true
            };
            //Leo el archivo
            const result = await productModel.paginate({}, options)
            //Tengo que transformar lo que me devuelve (texto) en un objeto
            return result
        } catch (error) {
            if (error.code === 'ENOENT') {
                return []
            } else {
                throw error
            }
        }
    }

    async getProductsPaginate(data) {
        try {
            const defaultOptions = {
                page: 1,
                limit: 10,
                sort: {},
                lean: true
            };

            const options = {
                page: defaultOptions.page,
                limit: defaultOptions.limit,
                sort: defaultOptions.sort,
                lean: defaultOptions.lean
            };

            const query = {};

            if (data) {
                const { categorysValue, sortValue, limitValue, pageValue } = data;

                if (pageValue) {
                    options.page = pageValue;
                }

                if (limitValue) {
                    options.limit = limitValue;
                }

                if (categorysValue) {
                    query.category = categorysValue;
                }

                if (sortValue) {
                    options.sort.price = sortValue === "asc" ? 1 : -1;
                }
            }

            const result = await productModel.paginate(query, options);

            const nextPage = result.page < result.totalPages ? result.page + 1 : null;
            const backPage = result.page > 1 ? result.page - 1 : null;

            return { ...result, nextPage, backPage };
        } catch (error) {
            console.error('Error al obtener productos paginados:', error);
            throw error;
        }
    }
    async addProduct(data) {
        try {
            //Desestructuramos el objeto
            let { name, description, price, category, available } = data
            //Consulto que esten todos los datos cargados
            if (!name || !description || !price || !category || !available) {
                console.log({ status: "error", error: "Faltan parametros" })
            }
            //Uso el metodo create para agregar cada uno de los campos de la collection
            let result = await productModel.create({ name, description, price, category, available })

            //Retorno el result para que finalice la funcion           
            return result
        }
        catch (error) {
            console.error("Error al crear producto", error);
        }
    }

    async deleteProduct(idProduct) {
        try {

            //Comparamos el _id de la base de datos con el id de nuestro producto
            let result = await productModel.deleteOne({ _id: idProduct })

            console.log("Elemento borrado con exito")

            return result

        } catch (error) {
            console.error("Error no se pudo borrar el item", error);
        }
    }

    async updateProduct(idProduct, updateData) {
        try {
            let { name, description, price, category, available } = updateData
            //Consulto que esten todos los datos cargados
            if (!name || !description || !price || !category || !available) {
                console.log({ status: "error", error: "Faltan parametros" })
            }
            //Comparamos el _id de la base de datos con el id de nuestro producto

            let result = await productModel.updateOne({ _id: idProduct }, updateData)

            console.log("Producto actualizado con exito");

            return result

        } catch (error) {

        }
    }
}

export default ProductManager