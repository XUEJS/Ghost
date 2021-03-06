var should = require('should'), // jshint ignore:line
    card = require('../../../../../server/lib/mobiledoc/cards/html'),
    SimpleDom = require('simple-dom'),
    opts;

describe('HTML card', function () {
    it('HTML Card renders', function () {
        opts = {
            env: {
                dom: new SimpleDom.Document()
            },
            payload: {
                html: '<h1>HEADING</h1><p>PARAGRAPH</p>'
            }
        };

        var serializer = new SimpleDom.HTMLSerializer([]);
        serializer.serialize(card.render(opts)).should.match('<div class="kg-card-html"><h1>HEADING</h1><p>PARAGRAPH</p></div>');
    });

    it('Plain content renders', function () {
        opts = {
            env: {
                dom: new SimpleDom.Document()
            },
            payload: {
                html: 'CONTENT'
            }
        };

        var serializer = new SimpleDom.HTMLSerializer([]);
        serializer.serialize(card.render(opts)).should.match('<div class="kg-card-html">CONTENT</div>');
    });

    it('Invalid HTML returns', function () {
        opts = {
            env: {
                dom: new SimpleDom.Document()
            },
            payload: {
                html: '<h1>HEADING<'
            }
        };

        var serializer = new SimpleDom.HTMLSerializer([]);
        serializer.serialize(card.render(opts)).should.match('<div class="kg-card-html"><h1>HEADING<</div>');
    });

    it('Caption renders', function () {
        opts = {
            env: {
                dom: new SimpleDom.Document()
            },
            payload: {
                html: '<iframe src="http://vimeo.com"></iframe>',
                caption: 'Embed caption test'
            }
        };

        var serializer = new SimpleDom.HTMLSerializer([]);
        serializer.serialize(card.render(opts)).should.match('<div class="kg-card-html"><iframe src="http://vimeo.com"></iframe><p>Embed caption test</p></div>');
    });
});
