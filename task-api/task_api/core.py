from flask_caching import Cache
from flask_limiter import Limiter	
from flask_limiter.util import get_remote_address


limiter = Limiter(	
	key_func=get_remote_address,	
	default_limits=["1000 per hour"]
)

cache = Cache(
	config={
		'CACHE_TYPE': 'simple',
		'CACHE_DEFAULT_TIMEOUT': 1
	}
)