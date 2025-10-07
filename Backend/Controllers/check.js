const check = (req,res)=>{
    return res.json({
        message: "user is Logged in",
        success: true
    })
}

module.exports = check;