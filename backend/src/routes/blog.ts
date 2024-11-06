import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify } from 'hono/jwt'
export const blogRouter = new Hono<
{
    Bindings: {
		DATABASE_URL: string,
		JWT_SECRET:string
	},
	Variables : {
		userId: string
	}
}>();

blogRouter.use('/*', async (c, next) => {
	const jwt = c.req.header('Authorization') ||"";
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}else
    {
		c.set('userId', payload.id as string);
        await next()
    }
})

blogRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
})

//we need pagination here.
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany();
        
        // Check if posts are found
        if (!posts || posts.length === 0) {
            return c.json({ message: "No posts found" }, 404); // Return a 404 if no posts exist
        }

        return c.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        c.status(500); // Internal server error
        return c.json({
            message: "Error fetching posts",
             // Include error message for debugging
        });
    }
});


blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	try{
        const post = await prisma.post.findUnique({
            where: {
                id:id
            }
        });
    
        return c.json(post);    
    }
	catch(e)
    {
        c.status(411);
        return c.json({
            message:"error while fetching the blog"
        })
    }
})

blogRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	await prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});
