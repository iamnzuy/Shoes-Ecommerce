
function Contact(){

    return (
        <>

            <div className="m-4 text-center font-bold text-6xl my-6 p-2">
                Contact
            </div>
            <div className="mx-4 my-6 flex justify-around items-center h-auto">
                <div className="basis-3/12 text-center bg-slate-100 rounded-2xl p-6">
                    <i className="fa fa-envelope font-medium text-4xl"></i>
                    <h2 className="font-bold text-2xl my-2">Email us:</h2>
                    <p>Email us for general queries for free.</p>
                    <a href="#" className="text-blue-500 hover:text-blue-300">shooting-shoes@feet.com</a>
                </div>
                <div className="basis-3/12 text-center bg-slate-100 rounded-2xl p-6">
                    <i className="fa fa-phone font-medium text-4xl"></i>
                    <h2 className="font-bold text-2xl my-2">Call us:</h2>
                    <p>Call us to speak to a member of our team. We are always happy to help.</p>
                    <a href="#" className="text-blue-500 hover:text-blue-300">(+84) 123456789</a>
                </div>
                <div className="basis-3/12 text-center bg-slate-100 rounded-2xl p-6">
                    <i className="fa fa-facebook font-medium text-4xl"></i>
                    <h2 className="font-bold text-2xl my-2">Follow us:</h2>
                    <p>Don't hesitate to give us a follow on social media.</p>
                    <a href="#" className="text-blue-500 hover:text-blue-300">Shooting Shoes</a>
                </div>
            </div>
            <div className="m-4 p-4 text-center font-medium text-xl">
                Shooting Shoes is an online shoes store ranked #2 in VietNam (2025).
                We ambitiously bring you the best quality shoes with a resonable price.
                Seeing a bright future ahead, we accept all comments from you, our precious customers!
                Thank you for being a part of our lovely business!
            </div>
            
        </>
    )
}

export default Contact;