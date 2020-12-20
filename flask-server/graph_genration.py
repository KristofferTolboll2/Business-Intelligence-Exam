import matplotlib.pyplot as plt
import random
import numpy as np
import uuid
from dataclasses import dataclass


@dataclass(order=True)
class User:
    """Dataclass for the user"""
    _id: int
    mental_health_level: int
    membership_days: int = 0
    # in thousands
    income_in_usd: int = 50


def generate_user_data(user_amount=1000):
    values = range(0, 100, 10)
    income_in_usd = range(30, 150, 10)
    for index in range(user_amount):
        user = User(index, random.choice(values), random.choice(values), random.choice(income_in_usd))
        yield user


def generate_graph(user: User, color='orange', user_color='aqua'):

    users = list(generate_user_data())
    fig = plt.figure()
    ax = plt.axes(projection="3d")

    x_vals = list(map(lambda user: user.membership_days, users))
    y_vals = list(map(lambda user: user.mental_health_level, users))
    z_vals = list(map(lambda user: user.income_in_usd, users))

    x_vals.sort()
    y_vals.sort()
    z_vals.sort()

    num_bars = len(users)
    x_pos = x_vals
    y_pos = y_vals
    z_pos = z_vals
    x_size = np.ones(num_bars)
    y_size = np.ones(num_bars)
    z_size = random.sample(range(num_bars), num_bars)

    ax.bar3d(x_pos, y_pos, z_pos, x_size, y_size, z_size, color=color)
    ax.bar3d(user.membership_days, user.mental_health_level, user.income_in_usd, x_size, y_size, z_size, color=user_color)
    seed = random.random()
    #plt.savefig(f'./graphs/{seed}.png')
    return fig



