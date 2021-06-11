from fastapi import APIRouter
from starlette.requests import Request
from pydantic import BaseModel

router = APIRouter()


class RedisKeyVal(BaseModel):
    key: str
    value: str


class RedisKey(BaseModel):
    key: str


@router.post('/set-key')
async def redis_set_key(request: Request, redisKeyVal: RedisKeyVal):
    await request.app.state.redis.set(redisKeyVal.key, redisKeyVal.value)
    return True


@router.post('/get-key')
async def redis_get_key(request: Request, redisKey: RedisKey):
    val = await request.app.state.redis.get(redisKey.key)
    return val
