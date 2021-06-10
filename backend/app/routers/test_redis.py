from fastapi import APIRouter
from starlette.requests import Request

router = APIRouter()


@router.get('/set-key')
async def redis_set_key(request: Request):
    await request.app.state.redis.set('key', 'val')
    return True


@router.get('/get-key')
async def redis_get_key(request: Request):
    val = await request.app.state.redis.get('key')
    return val
