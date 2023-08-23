const User = require('../models/userModel');
const bcrypt = require('bcrypt');


let products = [{
    image: "https://m.media-amazon.com/images/I/51UuPZLMaCL._AC_SX679_.jpg",
    CardTitle: "APPLE iPhone 13 (Midnight, 128 GB)",
    discription: "Super Retina XDR Display5G A15 Bionic Chip 15.4 cm (6.1 inch) all‑screen OLED Display Pro 12 MP Camera System: Telephoto, Wide and Ultra Wide Cameras MagSafe wireless charging up to 15W ",
    price:"€ 1,155",
    button: "Add to Trolley",
    buynow:"Buy Now"
  },
  {
    image: "https://m.media-amazon.com/images/I/61o9g6JTFRL._AC_SY550_.jpg",
    CardTitle: "ASUS ROG Phone 6 Pro 5G 512GB  White",
    discription: "Qualcomm Snapdragon 8 Plus Gen 1, 18 GB|512 GB 50 MP + 13 MP + 5 MP Triple Rear Camera 12 MP Front Camera  65W Charging AMOLED Android 12",
    price:"€ 1,122",
    button: "Add to Trolley",
    buynow:"Buy Now"
  },
  {
    image: "https://m.media-amazon.com/images/I/81qOD8EZTjL._AC_SX679_.jpg",
    CardTitle: "OnePlus 10 Pro | 5G Android Smartphone |128GB",
    discription: "12 GB RAM,  6.7 Inches; 120 Hz QHD+ Fluid AMOLED, 48MP + 50MP+8MP | 32MP Front Camera, 5000 mAh with 80W SuperVOOC, Qualcomm Snapdragon 8 Gen 1",
    price:"€ 518",
    button: "Add to Trolley",
    buynow:"Buy Now"
  },
  {
    image: "https://i.gadgets360cdn.com/products/large/Pixel-7-Pro-643x800-1665067249.jpg?downsize=*:420&output-quality=80",
    CardTitle: "Google Pixel 7 Pro (Obsidian, 128 GB)",
    discription: "12 GB RAM,17.02 cm (6.7 inch) Quad HD+ Display, 50MP + 48MP + 12MP | 10.8MP Front Camera, 4926 mAh Battery, Google Tensor G2 Processor, 1 year Domestic Warranty",
    price:"€ 764",
    button: "Add to Trolley",
    buynow:"Buy Now"
  },
  {
    image: "https://images.samsung.com/in/smartphones/galaxy-z-flip4/buy/26_Flip4_Bespoke_ColorSelection_top5_silver_white_white_PC.png",
    CardTitle: " Samsung Galaxy Z Flip4 5G (Bespoke Edition, 128GB Storage) ",
    discription: "8 GB RAM | 128 GB ROM, 17.02 cm (6.7 inch) Full HD+ Display 12MP + 12MP | 10MP Front Camera, 3700 mAh Lithium Ion Battery, Qualcomm Snapdragon 8+ Gen 1 Processor",
    price:"€ 662",
    button: "Add to Trolley",
    buynow:"Buy Now"
  },
  {
    image: "https://m.media-amazon.com/images/I/61lWkGr0RiL._SX522_.jpg",
    CardTitle: "iQOO 9 Pro 5G (Legend, 256GB Storage|Dark Cruise)",
    discription: " Rear Camera: 50 MP + 50 MP + 16 MP Front Camera: 16 MP 12 GB RAM and 256 GB 120W Flash-charge,4700 mAh Li-Polymer battery, 1 Year Manufacturer Warranty ",
    price:"€ 649",
    button: "Add to Trolley",
    buynow:"Buy Now"
  },
  {
    image: "https://www.notebookcheck.net/fileadmin/_processed_/webp/Notebooks/News/_nc3/Screenshot_2022_01_25_153338-q82-w240-h.webp",
    CardTitle: "HUAWEI P50 Pro - 128GB (Cocoa Gold)",
    discription: "8GB 6.60-inch OLED, Qualcomm Snapdragon 888  Front Camera 13MP,Rear Camera 50MP + 40MP + 13MP + 64MP, 4360mAh Lithium Ion Battery 1 Year Domestic Warranty",
    price:"€ 626",
    button: "Add to Trolley",
    buynow:"Buy Now"
  },
  {
    image: "https://m.media-amazon.com/images/I/71NEXxpUZaL._SX679_.jpg",
    CardTitle: "Nothing Phone 1  256GB , (Black)",
    discription: "12 GB RAM | 256 GB ROM, 16.64 cm (6.55 inch) Full HD+ 6.55in 120Hz OLED Display, 50MP + 50MP | 16MP Front Camera, Qualcomm Snapdragon 778G+, 4500 mAh  Lithium Ion Battery 1 Year Manufacturer Warranty",
    price:"€ 549.99",
    button: "Add to Trolley",
    buynow:"Buy Now"
  }]


//generate secure hash of password

const securePassword = async(password)=>{
    try{

       const passwordHash = await bcrypt.hash(password,10);

       return passwordHash;

    }catch(err){
        console.log(err.message)
    }
}




//load register page

const loadRegister = async (req,res) =>{
    try{
        res.render('registration')

    }catch(err){
        console.log(err.message);
    }
}
// function to handle user registration

const insertUser = async(req,res)=>{
    try{

        
        const spassword = await securePassword(req.body.password);
        const user = new User({

            name:req.body.name,
            email:req.body.email,
             mobile:req.body.mobile,
             password:spassword,
            is_admin:0,
        })

    const userData = await user.save();
    
    if(userData){

        res.render('registration',{message:"Registration Successfully Completed "})
    }else{
        res.render('registration',{message:"Oops! Registration  Failed"})
    }

    }catch(err){
console.log(err.message)
    }
}


//login user methods 

const loginLoad = async (req,res) => {
    try{
        
        res.render('login')
    }catch(err){
        console.log(err.message)
    }
}


// login verifiction

const verifyLogin = async (req,res) => {

    try{
        const email = req.body.email
        const password = req.body.password 
const userData = await User.findOne({email:email})

if(userData){

const passwordMatch = await bcrypt.compare(password, userData.password)
if(passwordMatch){

    if(userData.is_admin === 1){
        res.render('login',{message:"Invalid Credentials"})
    }else{
        req.session.user_Id= userData._id;
        req.session.isLoggedIn = true;
        res.redirect('/home'); 
        }
  
   
}else{
    res.render('login',{message:"Invalid Credentials"})

}

}else{
 
    res.render('login',{message:"Invalid Credentials"})   

}



    }catch(err){
        console.log(err.message)
    }

}
// load homepage
const loadHome =async (req, res) =>{
    try{

        res.render('home',{products:products});
    }catch(err){

        console.log(err.message)
    }
}

//logout to login page

    const userLogout = async(req, res) =>{

        try{
        req.session.user_Id = null
            res.redirect('/')
        }catch(err){
            console.log(err.message)
        }
    }

module.exports ={
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout
}