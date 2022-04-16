import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost} from '../controllers/posts.js';
import auth from '../middleware/auth.js';
//we will use the middleware auth here so everyone can see the posts even if they don't login but only the logged in users can like, update, or delete a post
const router = express.Router();
router.get('/', getPosts );
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;