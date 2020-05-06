import React, { Component } from 'react';

import Search from './Search';
import Checkbox from './Checkbox';

class Menu extends Component {
    render() {
        return (
            <div className="menu">
                <div className="menu__inner">
                    <Search />

                    <div className="menu__filters">
                        <h2>Filters:</h2>

                        <ul className="checkboxes">
                            <li>
                                <Checkbox index={0} name={'Закуска'} />
                            </li>
                            
                            <li>
                                <Checkbox index={1} name={'Бързи'} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;