import React from 'react'

const ProductList = ({ filteredProducts }: any) => {
    console.log("filteredProducts",filteredProducts)
    if(filteredProducts.length<=0) return <h1 className='text-red-600'>Does not have any product fillter data</h1>
    


    return (
        <>  {filteredProducts.map((product: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; data: { color: any; capacity: any; }; }, index: React.Key | null | undefined) => (
            <div key={index} className="p-4 border rounded">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                {product.data?.color || product.data?.capacity ? (
                    <>
                        {product.data?.color && <p>Color: {product.data.color}</p>}
                        {product.data?.capacity && <p>Capacity: {product.data.capacity}</p>}
                    </>
                ) : (
                    <p>Data: N/A</p>
                )}


            </div>
        ))}
        </>
    )
}

export default ProductList