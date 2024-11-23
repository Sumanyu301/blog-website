import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify } from 'hono/jwt'
import { createBlogInput,updateBlogInput } from "@uynamus/medium-common";
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
	const jwt = c.req.header('Authorization') || "";
	
	// Check if token exists and is properly formatted
	if (!jwt.startsWith("Bearer ")) {
	  c.status(401);
	  return c.json({ error: "unauthorized" });
	}
	
	const token = jwt.split(' ')[1];
  
	// Verify the token
	let payload;
	try {
	  payload = await verify(token, c.env.JWT_SECRET);
	} catch (err) {
	  console.error("JWT verification failed:", err);
	  c.status(401);
	  return c.json({ error: "unauthorized" });
	}
  
	// Attach userId to the request context
	c.set('userId', payload.id as string);
  
	// Proceed to the next middleware or route handler
	await next();
  });
  

blogRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    
	const body = await c.req.json();

    const success = createBlogInput.safeParse(body);
    if(!success)
    {
        c.status(411);
        return c.json({
            message:"inputs are wrong"
        })
    }

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
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        blogs
    })
})


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

    const success = updateBlogInput.safeParse(body);
    if(!success)
    {
        c.status(411);
        return c.json({
            message:"inputs are wrong"
        })
    }

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
