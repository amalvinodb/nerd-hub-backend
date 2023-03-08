"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    landing_page(req, res) {
        res.status(200).json({ status: true, message: "this is the landing page" });
    },
};
