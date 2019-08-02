
odoo.define("barcode_background.line_widget", function (require) {
    'use strict';

    var core = require('web.core');
    var QWeb = core.qweb;

    var widgets = require("stock_barcode.LinesWidget");


    widgets.include({
        // start: function () {
        //     var self = this;
        //     return this._super.apply(this, arguments).then(function () {
        //         return self._renderLines();
        //     });
        // },

        incrementProduct: function (id_or_virtual_id, qty, model, doNotClearLineHighlight) {
            var $line = this.$("[data-id='" + id_or_virtual_id + "']");
            var incrementClass = model === 'stock.picking' ? '.qty-done' : '.product_qty';
            var qtyDone = parseInt($line.find(incrementClass).text(), 10);
            var qtyAfter = qtyDone + qty;
            $line.find(incrementClass).text(qtyAfter);
            this._highlightLine($line, doNotClearLineHighlight);

            this._handleControlButtons();

            if (qty === 0) {
                this._toggleScanMessage('scan_lot');
            } else if (this.mode === 'receipt') {
                this._toggleScanMessage('scan_more_dest');
            } else if (['delivery', 'inventory'].indexOf(this.mode) >= 0) {
                this._toggleScanMessage('scan_more_src');
            } else if (this.mode === 'internal') {
                this._toggleScanMessage('scan_more_dest');
            } else if (this.mode === 'no_multi_locations') {
                this._toggleScanMessage('scan_products');
            }

            // 获取目标数量
            var total = parseInt($line.find(incrementClass).next().text().split("/")[1]);
            if (qtyAfter === total) {
                // "--设置完成背景色--"
                $line.css("background", "#90EE90");
            }
            else if (qtyAfter < total) {
                // "--渐变效果--"
                var x = (qtyAfter / total) * 100;
                var csx = "-webkit-gradient(linear, 0 0, " + x + "% " + x + "%" + ", from(#87CEFA), to(#FFFFFF))"
                $line.css({
                    "background": csx
                });
            }

        },

        addProduct: function (lineDescription, model, doNotClearLineHighlight) {
            var $body = this.$el.filter('.o_barcode_lines');
            var $line = $(QWeb.render('stock_barcode_lines_template', {
                lines: [lineDescription],
                groups: this.groups,
                model: model,
            }));
            $body.prepend($line);
            $line.on('click', '.o_edit', this._onClickEditLine.bind(this));
            $line.on('click', '.o_package_content', this._onClickTruckLine.bind(this));
            this._highlightLine($line, doNotClearLineHighlight);

            this._handleControlButtons();

            if (lineDescription.qty_done === 0) {
                this._toggleScanMessage('scan_lot');
            } else if (this.mode === 'receipt') {
                this._toggleScanMessage('scan_more_dest');
            } else if (['delivery', 'inventory'].indexOf(this.mode) >= 0) {
                this._toggleScanMessage('scan_more_src');
            } else if (this.mode === 'internal') {
                this._toggleScanMessage('scan_more_dest');
            } else if (this.mode === 'no_multi_locations') {
                this._toggleScanMessage('scan_products');
            }

            // 设置黄色背景
            $line.css("background", "#FFEC8B");
        },

        _renderLines: function () {
            this._super();
            // 检查每行
            var $lines =  this.$el.find(".o_barcode_line");
            $lines.each(function(index,item){
                var qty_done = parseFloat($(this).find(".qty-done").text());
                var total = parseFloat($(this).find(".o_barcode_scanner_qty > span").last().text().split("/")[1]);
                if (qty_done === total) {
                    // "--设置完成背景色--"
                    $(this).css("background", "#90EE90");
                }
                else if (qty_done < total) {
                    // "--渐变效果--"
                    var x = (qty_done / total) * 100;
                    var csx = "-webkit-gradient(linear, 0 0, " + x + "% " + x + "%" + ", from(#87CEFA), to(#FFFFFF))"
                    $(this).css({
                        "background": csx
                    });
                }
            });
            
        }
    });


});