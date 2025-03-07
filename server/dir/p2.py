def print_half_pyramid(n):
    if n > 0:
        print_half_pyramid(n - 1)
        
        print('*' * n)


print_half_pyramid(7)
