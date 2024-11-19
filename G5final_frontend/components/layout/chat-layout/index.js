import Navbar from "../default-layout/navbar";
export default function ChatLayout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
}