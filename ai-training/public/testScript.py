import js
import random
import requests
from PIL import Image

import torch
from diffusers import StableDiffusionPipeline


def test():
    pipe = StableDiffusionPipeline.from_pretrained(
        "CompVis/stable-diffusion-v1-4", torch_dtype=torch.float16)
    p = Element('picture')
    # urllib.request.urlretrieve(
    #     'https://thumbs.dreamstime.com/b/red-apple-isolated-clipping-path-19130134.jpg', 'Apple_Pic.png')
    im = Image.open(requests.get(
        'https://thumbs.dreamstime.com/b/red-apple-isolated-clipping-path-19130134.jpg', stream=True).raw)
    # p.write(im.show())
