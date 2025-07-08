import productModel from "../models/productModels";

export const getAllProducts = async () =>{
    return await productModel.find();
}

export const seedProducts = async()=>{
    const newProducts =[
        {title:"dell laptop", image: "https://i5.walmartimages.com/seo/Dell-Inspiron-3000-Laptop-15-6-Non-touch-Intel-Celeron-Processor-N4020-Graphics-600-4GB-DDR4-Memory-128GB-SSD-Hard-Drive-Windows-10-Home-S-mode_b106bcee-6f1f-4c18-87fc-b1f9677d39df.65d263e5ab6bcaa6d9edae94627ece7f.jpeg" , price:17000, stock:10},
        {title:"Lenovo laptop", image: "https://m.media-amazon.com/images/I/61IRRQ2gWPL._AC_SL1280_.jpg" , price:20000, stock:10},
        {title:"HP laptop", image: "https://m.media-amazon.com/images/I/61Y0buQFOkL.jpg" , price:280000, stock:10},
        {title:"Asus laptop", image: "https://i5.walmartimages.com/seo/Asus-14-Full-HD-Laptop-Intel-Celeron-N4020-4GB-RAM-64GB-SSD-Windows-10-Home-Star-Black-L410MA-DB02_43afa489-3c0d-4c4f-8781-91d1d90cdb1c.b8be2ea47304c13d21db7fb944f4977a.jpeg" , price:300000, stock:10},
        {title:"Fujitsu laptop", image: "https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/8xMAAOSwYN9iFNAm/$_57.JPG?set_id=8800005007" , price:350000, stock:10},
        {title:"mac laptop", image: "https://zasshope.com/cdn/shop/articles/0cf329370b964f7a0e4637f801936581_1200x1200.jpg?v=1709862151" , price:4000000, stock:10},
    ];
    const products = await getAllProducts();

    if (products.length === 0) {
        await productModel.insertMany(newProducts);
      }

}