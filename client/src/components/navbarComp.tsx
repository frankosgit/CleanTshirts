import * as React from "react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Icons } from "./ui/icons"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "./ui/button"
import { CartContext } from "@/context/cartContext"
import { CartActionType } from "./reducers/cartReducer"
import { IProduct } from "@/models/interfaces/products"
import { toast } from "./ui/use-toast"


export function Navbar() {

    const { cartItems, dispatchCart } = React.useContext(CartContext)
    const [cartTotal, setCartTotal] = React.useState(0)

    const removeFromCart = (product: IProduct) => {
        dispatchCart({ type: CartActionType.REMOVEFROMCART, payload: product })
        toast({
            title: "Product removed from cart",
            description: ` ${product.name} removed from cart`,
        })

    }

    React.useEffect(() => {
        const totalCountArray: number[] = []
        cartItems.map((item) => {
            totalCountArray.push(item.quantity)
        })
        const totalNumber = totalCountArray.reduce((x, y) => x + y, 0)
        setCartTotal(totalNumber)

    }, [cartItems])

    return (
        <>
            <NavigationMenu>
                <NavigationMenuList >
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-white-200 hover:bg-gray-200 no-underline outline-none p-4"
                                            href="/"
                                        >
                                            <Icons.logo className="h-6 w-6" />
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                home
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                See our beautifully designed T-Shirts with environment and sustainability in mind. Good prices and scandinavian design.
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/auth" title="Admin">
                                    Log in / register
                                </ListItem>
                                <ListItem className="p-4 transition-colors" href="/admin" title="Admin">
                                    Admin: view, edit & add stock
                                </ListItem>
                                <ListItem href="/" title="Admin">
                                    Contact us
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger><img src="../../public/cart.svg" className="h-4" alt="" /><span className="relative text-xs mb-2 ml-1">{cartTotal}</span></NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <h1>Cart</h1>
                                    </NavigationMenuLink>
                                </li>
                                {cartItems.map((cartItem) => {
                                    return (<ListItem key={cartItem.product._id} title={cartItem.product.name} showRemoveButton={true} product={cartItem.product} removeFromCart={removeFromCart}>
                                        {cartItem.product.name} {cartItem.quantity}
                                    </ListItem>)
                                })}

                                {cartTotal ?
                                    <>
                                        <Button className="mt-6 bg-black text-white hover:bg-white hover:text-black border border-transparent hover:border-black">Checkout</Button>
                                        <Button onClick={() => dispatchCart({ type: CartActionType.EMPTYCART })} variant="destructive" className="mt-6">Empty cart</Button>
                                    </>
                                    :
                                    <h4 className="text-xs mt-6">Your cart is empty</h4>
                                }

                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <Separator />
        </>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { showRemoveButton?: boolean, product?: IProduct, removeFromCart?: (product: IProduct) => void }
>(({ className, title, children, showRemoveButton, removeFromCart, product, ...props }, ref) => {


    return (
        <li className="flex justify-between items-center bg-white-200 hover:bg-gray-200 rounded-lg p-2 hover:text-accent-foreground">
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                        className
                    )}
                    {...props}
                >
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
            {showRemoveButton && product && removeFromCart && (
                <button onClick={() => removeFromCart(product)} className="text-xs h-6 bg-white text-black border border-black px-3 py-1 hover:bg-black hover:text-white">
                    Remove
                </button>
            )}
        </li>
    );
});

ListItem.displayName = "ListItem";


ListItem.displayName = "ListItem"
