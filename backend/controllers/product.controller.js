import mongoose from "mongoose"
import Product from "../models/product.model.js"

export const createProduct = async (req, res) => {
  const product = req.body

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({success: false, message: "Please provide all fields"})
  }

  const newProduct = new Product(product)

  try {
    await newProduct.save()
    res.status(201).json({success: true, data: newProduct})
  } catch (error) {
    console.error("Error in Create process: ", error.message)
    res.status(500).json({success: false, message: "Server error"})
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})

    res.status(200).json({success: true, data: products})
  } catch (error) {
    console.error("Error fetching products: ", error.message)
    res.status(500).json({success: false, message: "Server error"})
  }
}

export const findProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await Product.findById(productId)

    res.status(200).json({success: true, data: product})
  } catch (error) {
    console.error(`Error finding product ${id}: ${error.message}`)
    res.status(500).json({success: false, message: `Error retrieving Product#${id}`})
  }
}

export const updateProduct = async (req, res) => {
  const {id} = req.params
  const product = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({success: false, message: "Invalid Prod ID"})
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true})

    if (!updatedProduct) {
      return res.status(404).json({success: false, message: "Product not found"})
    }

    res.status(200).json({success: true, data: updatedProduct})
  } catch (error) {
    res.status(500).json({success: false, message: "Server error"})
  }
}

export const deleteProduct = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({success: false, message: "Product not found"})
  }

  try {
    await Product.findByIdAndDelete(id)
    res.status(200).json({success: true, message: "Product deleted"})
  } catch (error) {
    console.log("Error: ", error.message)
    res.status(500).json({success: false, message: "Swerver Error"})
  }
}
