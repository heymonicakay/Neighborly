import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { CategoryProvider } from "../categories/CategoryProvider";
import { ItemTagProvider } from "../ItemTags/ItemTagProvider";
import { TagProvider } from "../tags/TagProvider";
import { ItemProvider } from "../items/ItemProvider";
import { ItemDetails } from "../items/ItemDetail"
import { ItemForm } from "../items/ItemForm";
import { ItemList } from "../items/ItemList";
import { UserContext } from "../users/UserProvider"

export default () => {
    const { currentUser } = useContext(UserContext)

    return (
        <>
        <CategoryProvider>
        <ItemTagProvider>
        <TagProvider>
        <ItemProvider>
            <Route path="/items/:itemId(\d+)" render={props => (
                <div className="main-wrap">
                    <div className="top-spacer"></div>
                        <ItemDetails {...props} />
                    <div className="bottom-spacer"></div>
                </div>
            )} />

            <Route exact path="/new_item" render={props => (
                <div className="main-wrap">
                    <div className="top-spacer"></div>
                    <div className="mid-section">
                        <ItemForm {...props} />
                    </div>
                    <div className="bottom-spacer"></div>
                </div>
            )} />

            <Route exact path="/items/edit/:itemId(\d+)" render={props =>(
                <div className="main-wrap">
                    <div className="top-spacer"></div>
                    <div className="mid-section">
                        <ItemForm {...props} />
                    </div>
                    <div className="bottom-spacer"></div>
                </div>
            )} />

        <Route exact path="/items/category/:categoryId(\d+)" render={props => (
            <div className="main-wrap">
                <div className="top-spacer"></div>
                <div className="mid-section">
                    <div className="left-main">
                        <ItemList byCategory {...props} />
                    </div>
                </div>
                <div className="bottom-spacer"></div>
            </div>
        )} />
        <Route exact path="/items" render={(props) => (
            <div className="main-wrap">
                <div className="top-spacer"></div>
                <div className="mid-section">
                    <div className="left-main">
                        <ItemList allItems {...props} />
                    </div>
                </div>
                <div className="bottom-spacer"></div>
            </div>
        )} />
        <Route exact path="/items/user/:userId(\d+)" render={(props) => (
            <div className="main-wrap">
                <div className="top-spacer"></div>
                <div className="mid-section">
                    <ItemList byUser {...props} />
                </div>
                <div className="bottom-spacer"></div>
            </div>
        )} />

        <Route exact path="/items/mine" render={(props) => (
            <div className="main-wrap">
                <div className="top-spacer"></div>
                <div className="mid-section">
                    <div className="left-main">
                        <ItemList myItems {...props} />
                    </div>
                </div>
                <div className="bottom-spacer"></div>
            </div>
        )} />
        </ItemProvider>
        </TagProvider>
        </ItemTagProvider>
        </CategoryProvider>
        </>
    )
}