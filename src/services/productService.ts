import productModel from "../models/productModels";

export const getAllProducts = async () =>{
    return await productModel.find();
}

export const seedProducts = async()=>{
    const newProducts =[
        {title:"dell laptop", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSMl9EbCtnVCMJOerHnCLWhmLlyPcutIPdqTCCYQK2nq8Fa5Dq-YUxM3Vc9ctEdKxIE4qDsGeKgtoPiYoMITMuyXRW2skQsppulWiS67Y6SUg51m7UTihT7PF-dPMIa3GUiX63WPHTXkA&usqp=CAc" , price:17000, stock:10},
        {title:"product 2", image: "image2.jpg" , price:20, stock:20},
        {title:"product 3", image: "image3.jpg" , price:30, stock:30},
        {title:"product 4", image: "image4.jpg" , price:40, stock:40},
        {title:"product 5", image: "image5.jpg" , price:50, stock:50},
        {title:"product 6", image: "image6.jpg" , price:60, stock:60},
        {title:"product 7", image: "image7.jpg" , price:70, stock:70},
        {title:"product 8", image: "image8.jpg" , price:80, stock:80},
        {title:"product 9", image: "image9.jpg" , price:90, stock:90},
        {title:"product 10",image: "image10.jpg", price:100, stock:100},
    ];
    const products = await getAllProducts();

    if (products.length === 0) {
        await productModel.insertMany(newProducts);
      }

}