var assert = require('assert');
var litdate = require('./litdate.js');

var date1 = new Date(2005, 0, 2, 3, 4, 5);

describe('Week', function () {
    it('Y-m-d H:i:s', function () {
        assert.equal('2005-01-02 03:04:05', litdate(date1).format('Y-m-d H:i:s'));
    });
    it('y年n月j日 G时I分S秒', function () {
        assert.equal('05年1月2日 3时4分5秒', litdate(date1).format('y年n月j日 G时I分S秒'));
    });
    it('o-W-N', function () {
        assert.equal('2004-53-7', litdate(date1).format('o-W-N'));
    });
});
