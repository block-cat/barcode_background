# -*- coding: utf-8 -*-
from odoo import http

# class BarcodeBackground(http.Controller):
#     @http.route('/barcode_background/barcode_background/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/barcode_background/barcode_background/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('barcode_background.listing', {
#             'root': '/barcode_background/barcode_background',
#             'objects': http.request.env['barcode_background.barcode_background'].search([]),
#         })

#     @http.route('/barcode_background/barcode_background/objects/<model("barcode_background.barcode_background"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('barcode_background.object', {
#             'object': obj
#         })