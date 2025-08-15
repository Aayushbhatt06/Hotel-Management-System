const itemsModel = require('../Models/Items');

const addItem = async(req,res)=>{
    try {
        const {name,image,price,quantity,desc,category, resId} = req.body;
        
        if (!name || !price || !category) {
            return res.status(400).json({
                message: "Name, Price, and Category are required.",
                success: false
            });
        }

        const item = await itemsModel.findOne({
            name: name,
            restaurantId: resId
        });
        if(item){
            return res.status(409).json({ 
                message: "Item already exist",
                success:false
            });
        }

        const newItem = new itemsModel({name,image,price,quantity,desc,category,restaurantId: resId});
        await newItem.save();

        return res.status(201).json({
            message: "Item added successfully",
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};
const getItems = async(req, res) => {
    try{
        const {resId} = req.params;
        const items = await itemsModel.find({
            restaurantId: resId
        });
        if(!items) {
            return res.status(404).json({
                message: "No items found"
            })
        }

        return res.status(200).json({
            message: "Items fetched succesfully",
            data: items
        })
    }catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

const getItem = async(req, res) => {
    try{
        const {resId, id} = req.params;
        const item = await itemsModel.findOne(
            {
                _id: id,
                restaurantId: resId
            }
        );
        
        if(!item) {
            return res.status(404).json({
                message: "Item not found",
                data: item
            })
        }
        return res.status(200).json({
            message:"Item fetched sucessfully",
            data:item
        })
    }catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

module.exports = {
    addItem, getItems, getItem
};
