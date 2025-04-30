/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 * For full license text, see the LICENSE file in the repo
 * root or https://opensource.org/licenses/apache-2-0/
 */
import { api, LightningElement } from 'lwc';

const MESSAGE_CONTENT_CLASS = 'embedded-messaging-message-content';
const ENDUSER = 'EndUser';
const AGENT = 'Agent';
const CHATBOT = 'Chatbot';
const PARTICIPANT_TYPES = [ENDUSER, AGENT, CHATBOT];

/**
 * A Lightning Web Component (LWC) that renders dynamic content within a commerce messaging interface.
 *
 * This component is designed to handle different types of message payloads, including plain text
 * and structured product recommendation messages. It parses incoming message data, determines
 * how to render it, and provides interaction support such as "Add to Cart" functionality.
 *
 * Key Features:
 * - Parses `conversationEntry` payloads to extract static text or JSON content.
 * - Supports rendering of product recommendation messages.
 * - Supports different sender types: EndUser, Agent, and Chatbot.
 * - Sends structured "Add to Cart" messages through the provided configuration utilities.
 *
 * Usage:
 * Pass a `conversationEntry` object (likely from an agent or bot conversation system)
 * and a `configuration` object that includes a `util.sendTextMessage()` method.
 *
 * Example:
 * <c-dynamic-content-renderer
 * configuration={configuration}
 * conversation-entry={entry}>
 * </c-dynamic-content-renderer>
 * @class
 * @augments LightningElement
 */
export default class DynamicContentRenderer extends LightningElement {
    /**
     * Configuration object passed to the component, typically includes utilities like sendTextMessage.
     * @type {object}
     */
    @api configuration;

    _conversationEntry;

    /**
     * Sets the conversation entry and triggers processing of the entry payload.
     * @param {object} value - The conversation entry containing metadata and payload.
     */
    @api
    set conversationEntry(value) {
        this._conversationEntry = value;
        this.processEntryPayload();
    }

    /**
     * Gets the conversation entry.
     * @returns {object} The current conversation entry containing metadata and payload.
     */
    get conversationEntry() {
        return this._conversationEntry;
    }

    /** @type {string} */
    contentType = '';

    /** @type {Array<object>} */
    productData = [];

    /** @type {object} */
    entryPayload = {};

    /** @type {object|string|undefined} */
    staticText;

    /**
     * Processes the raw entry payload to extract contentType, static text, and product data.
     * Parses JSON content if applicable.
     */
    processEntryPayload() {
        this.contentType = '';
        this.productData = [];
        this.entryPayload = {};
        this.staticText = undefined;
        this.parsedText = '';

        try {
            const rawPayload = this._conversationEntry?.entryPayload;

            try {
                this.entryPayload = JSON.parse(rawPayload);
            } catch {
                this.entryPayload = {
                    abstractMessage: {
                        staticContent: {
                            text: rawPayload,
                        },
                    },
                };
            }

            this.staticText = this.entryPayload?.abstractMessage?.staticContent;

            if (typeof this.staticText?.text === 'string' && this.staticText?.text.includes('contentType')) {
                this.parsedText = JSON.parse(this.staticText.text);
            } else {
                this.parsedText = this.staticText?.text;
            }

            this.contentType = this.parsedText?.contentType || '';

            if (this.isProductRecommendations && this.parsedText?.products) {
                this.productData = this.parsedText.products;
            }
        } catch (error) {
            console.error('Failed to process entryPayload:', error);
        }
    }

    /**
     * Gets the role of the sender from the conversation entry.
     * @returns {string|undefined} The sender's role (e.g., EndUser, Agent, or Chatbot).
     */
    get sender() {
        return this._conversationEntry?.sender?.role;
    }

    /**
     * Determines if the content type is product recommendations.
     * @returns {boolean} True if the content type is 'productRecommendations'; otherwise, false.
     */
    get isProductRecommendations() {
        return this.contentType === 'productRecommendations';
    }

    /**
     * Determines if the content is plain rich text (no contentType specified).
     * @returns {boolean} True if contentType is empty; otherwise, false.
     */
    get isRichTextContent() {
        return this.contentType === '';
    }

    /**
     * Handles the "Add to Cart" button click by sending a predefined text message.
     * @param {CustomEvent} event - Event containing the product details.
     */
    handleAddToCart(event) {
        const product = event?.detail?.product?.name;
        if (product) {
            this.configuration.util.sendTextMessage(
                `Can you help me add ${product} with Color Option 'White' and Size Option '6'`
            );
        }
    }

    /**
     * Returns the class name of the message bubble.
     * @returns {string} A space-separated string of class names for the message bubble.
     * @throws Will throw an error if the sender is not a supported participant type.
     */
    get generateMessageBubbleClassname() {
        if (this.isSupportedSender()) {
            return `${MESSAGE_CONTENT_CLASS} ${this.sender}`;
        }
        throw new Error(`Unsupported participant type passed in: ${this.sender}`);
    }

    /**
     * Checks if the sender is one of the supported participant types.
     * @returns {boolean} True if the sender is EndUser, Agent, or Chatbot; otherwise, false.
     */
    isSupportedSender() {
        return PARTICIPANT_TYPES.some((participantType) => this.sender === participantType);
    }

    /**
     * Returns the parsed text content.
     * @returns {string|object} The extracted or parsed message content from the payload.
     */
    get textContent() {
        return this.parsedText;
    }
}
