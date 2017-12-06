var assert = require('assert');
var litdate = require('./litdate.js');

var date1 = new Date(2005, 0, 2, 3, 4, 5);
var date20070101 = new Date(2007, 0, 1);
var date20071231 = new Date(2007, 11, 31);
var date20080201 = new Date(2008, 1, 1, 0, 35);
var date20090201 = new Date(2009, 1, 1, 12, 35);
var date20000101 = new Date(2000, 0, 1, 1, 35);
var date19000101 = new Date(1900, 0, 1, 13, 35);

describe('年月日时分秒', function () {
    it('Y-m-d H:i:s', function () {
        assert.equal('2005-01-02 03:04:05', litdate(date1).format('Y-m-d H:i:s'));
    });
    it('y年n月j日 G时I分S秒', function () {
        assert.equal('05年1月2日 3时4分5秒', litdate(date1).format('y年n月j日 G时I分S秒'));
    });
});
describe('周', function () {
    it('属于上一年', function () {
        assert.equal('2004-53-7', litdate(date1).format('o-W-N'));
    });
    it('属于本年', function () {
        assert.equal('2007-01-1', litdate(date20070101).format('o-W-N'));
    });
    it('属于下一年', function () {
        assert.equal('2008-01-1', litdate(date20071231).format('o-W-N'));
    });
    it('无前导0的周', function () {
        assert.equal(1, litdate(date20071231).e);
    });
    it('周日0', function () {
        assert.equal(0, litdate(date1).w);
    });
});
describe('月', function () {
    it('1月有31天', function () {
        assert.equal(31, litdate(date1).t);
    });
    it('2008年2月有29天', function () {
        assert.equal(29, litdate(date20080201).t);
    });
    it('2009年2月有28天', function () {
        assert.equal(28, litdate(date20090201).t);
    });
});
describe('闰年', function () {
    it('2008年是闰年', function () {
        assert.equal(1, litdate(date20080201).L);
    });
    it('2007年是平年', function () {
        assert.equal(0, litdate(date20070101).L);
    });
    it('2000年是润年', function () {
        assert.equal(1, litdate(date20000101).L);
    });
    it('1900年是平年', function () {
        assert.equal(0, litdate(date19000101).L);
    });
});
describe('每年第几天', function () {
    it('2007年1月1日是第1天', function () {
        assert.equal(0, litdate(date20070101).z);
        assert.equal(1, litdate(date20070101).Z);
    });
    it('2007年12月31日是第365天', function () {
        assert.equal(364, litdate(date20071231).z);
        assert.equal(365, litdate(date20071231).Z);
    });
});
describe('12小时制', function () {
    it('00:35 等于 12:35am', function () {
        assert.equal('12:35am', litdate(date20080201).format('h:ia'));
    });
    it('12:35 等于 12:35pm', function () {
        assert.equal('12:35pm', litdate(date20090201).format('h:ia'));
    });
    it('01:35 等于 01:35am', function () {
        assert.equal('01:35am', litdate(date20000101).format('h:ia'));
        assert.equal('1:35AM', litdate(date20000101).format('g:iA'));
    });
    it('13:35 等于 01:35pm', function () {
        assert.equal('01:35pm', litdate(date19000101).format('h:ia'));
        assert.equal('1:35PM', litdate(date19000101).format('g:iA'));
    });
});
