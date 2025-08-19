const check = (req,res)=>{
    const {name,email,contact,address,tables,_id} = req.rest
    
    return res.json({
        message: "user is Logged in",
        success: true,
        data:{
            name,
            email,
            contact,
            address,
            tables,
            _id
        }
    })
}

module.exports = check;