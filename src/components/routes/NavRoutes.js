import React from "react";
import { Route } from "react-router-dom";
import { ItemProvider } from "../items/ItemProvider";
import { Nav } from "../nav/Nav"

export default () => {
    return (
            <ItemProvider>
                <Route path="/" render={(props) => (
                    <nav className="cont--nav">
                        <Nav {...props} />
                    </nav>)} />
            </ItemProvider>
    )
}