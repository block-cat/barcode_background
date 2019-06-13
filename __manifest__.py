# -*- coding: utf-8 -*-
{
    'name': "barcode_background",

    'summary': """移动版扫码背景颜色""",

    'description': """
        移动版扫码操作添加背景颜色
        本应用依赖于企业版模块stock_barcode.
    """,

    'author': "kevinkong",
    'website': "https://github.com/block-cat/barcode_background",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/12.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['stock_barcode'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}