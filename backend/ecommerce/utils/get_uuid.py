import uuid
from products import Product

def get_uuid4():
    while True:
        unique_uuid = uuid.uuid4()
        if not Product.objects.filter(id=unique_uuid).exists():
            return unique_uuid
