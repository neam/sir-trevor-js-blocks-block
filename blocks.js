SirTrevor.Blocks.Blocks = (function () {

    return SirTrevor.Blocks.Columns.extend({

        type: "blocks",
        title: function () {
            return i18n.t('blocks:blocks:title');
        },
        icon_name: 'columns',

        columns_presets: {
            'blocks': [12] // One single level
        },

        controllable: false,

        _setBlockInner: function () {
            SirTrevor.Block.prototype._setBlockInner.apply(this, arguments);
            this.applyColumns('blocks', true);
            /* default */
        },

        toData: function () {
            var self = this;
            var column_config = this.columns_presets[this.columns_preset];
            var dataObj = { blocks: [] };

            this.getColumns().each(function (i) {
                var blocksData = [];
                $(this).children('.st-block').each(function () {
                    var block = self.sirTrevor.findBlockById(this.getAttribute('id'));
                    blocksData.push(block.saveAndReturnData());
                });

                dataObj.blocks = blocksData;
            });

            this.setData(dataObj);
        },

        loadData: function (data) {
            this.applyColumns('blocks', true);

            var blocks = (data.blocks || []);
            var $block = null;
            for (var j = 0; j < blocks.length; j++) {
                var block = blocks[j];
                $block = this.sirTrevor.createBlock(block.type, block.data, $block ? $block.$el : $column.children('.st-block-controls__top'));
            }
        }

    });

})();
