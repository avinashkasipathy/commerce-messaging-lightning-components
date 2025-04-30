/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 * For full license text, see the LICENSE file in the repo
 * root or https://opensource.org/licenses/apache-2-0/
 */
import { LightningElement, api } from 'lwc';

export default class productSearchRecommendations extends LightningElement {
    @api products = [];

    handleAddToCart(event) {
        const index = event.target.dataset.index;
        const product = this.products[index];

        if (product) {
            this.dispatchEvent(
                new CustomEvent('addtocart', {
                    detail: { product },
                })
            );
        }
    }
}
