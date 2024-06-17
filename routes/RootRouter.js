const Router = require("express").Router()

const MaincategoryRouter = require("./MaincategoryRoutes")
const SubcategoryRouter = require("./SubcategoryRoutes")
const BrandRouter = require("./BrandRoutes")
const ProductRouter = require("./ProductRoutes")
const TestimonialRouter = require("./TestimonialRoutes")
const UserRouter = require("./UserRoutes")
const CartRouter = require("./CartRoutes")
const WishlistRouter = require("./WishlistRoutes")
const CheckoutRouter = require("./CheckoutRoutes")
const NewsletterRouter = require("./NewsletterRoutes")
const ContactRouter = require("./ContactRoutes")


Router.use("/maincategory", MaincategoryRouter)
Router.use("/subcategory", SubcategoryRouter)
Router.use("/brand", BrandRouter)
Router.use("/product", ProductRouter)
Router.use("/testimonial", TestimonialRouter)
Router.use("/user", UserRouter)
Router.use("/cart", CartRouter)
Router.use("/wishlist", WishlistRouter)
Router.use("/checkout", CheckoutRouter)
Router.use("/newsletter", NewsletterRouter)
Router.use("/contact", ContactRouter)

module.exports = Router