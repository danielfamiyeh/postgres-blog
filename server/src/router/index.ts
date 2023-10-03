import { Router } from "express";

import { blogPostRouter } from "./blog-post.router";

const router = Router();

router.use('blog-post', blogPostRouter)

export { router}