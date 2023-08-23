const isLogin = async (req,res,next)=>{
    try{

        if(req.session.user_id){
            

        }else{


           return res.redirect('/admin');

        }

        next();

    }catch(err){
        console.log(err.message)
    }
}

const isLogout = async(req,res,next)=>{
    try{


        if(req.session.user_id){
           return res.redirect('/admin/home')
        }
        next();

    }catch(err){
        console.log(err.message)
    }
}

module.exports ={
    isLogin,
    isLogout   
}