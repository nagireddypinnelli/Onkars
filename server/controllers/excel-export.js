//var excel = require('node-excel-export');
"use strict";
var mongoose = require('mongoose');
//var ObjectId = require("mongojs").ObjectId;
var Problem = require('../models/problem.js');
var User = require('../models/user.js');
var Excel = require('exceljs');
var Account = require('../models/account.js');
//// You can define styles as json object 
//// More info: https://github.com/protobi/js-xlsx#cell-styles 
//var styles = {
//    headerDark: {
//        fill: {
//            fgColor: {
//                rgb: 'FF000000'
//            }
//        },
//        font: {
//            color: {
//                rgb: 'FFFFFFFF'
//            },
//            sz: 14,
//            bold: true,
//            underline: true
//        }
//    },
//    cellPink: {
//        fill: {
//            fgColor: {
//                rgb: 'FFFFCCFF'
//            }
//        }
//    },
//    cellGreen: {
//        fill: {
//            fgColor: {
//                rgb: 'FF00FF00'
//            }
//        }
//    }
//};

////Array of objects representing heading rows (very top) 
////var heading = [
////  [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
////  ['a2', 'b2', 'c2'] // <-- It can be only values 
////];

////Here you specify the export structure 
//var specification = {
//    problemId: { // <- the key should match the actual data key 
//        displayName: 'ProblemID', // <- Here you specify the column header 
//        headerStyle: styles.headerDark, // <- Header style 
//        //cellStyle: function(value, row) { // <- style renderer function 
//        //    // if the status is 1 then color in green else color in red 
//        //    // Notice how we use another cell value to style the current one 
//        //    return (row.status_id == 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible  
//        //},
//        width: 120 // <- width in pixels 
//    },
//    title: {
//        displayName: 'Title',
//        headerStyle: styles.headerDark,
//        //cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property 
//        //    return (value == 1) ? 'Active' : 'Inactive';
//        //},
//        width: '10' // <- width in chars (when the number is passed as string) 
//    },
//    problemStatement: {
//        displayName: 'Problem Statement',
//        headerStyle: styles.headerDark,
//        // cellStyle: styles.cellPink, // <- Cell style 
//        width: 220 // <- width in pixels 
//    },
//    busninessImpact: {
//        displayName: 'Busniness Impact',
//        headerStyle: styles.headerDark,
//        // cellStyle: styles.cellPink, // <- Cell style 
//        width: 220 // <- width in pixels 
//    },
//    createdBy: {
//        displayName: 'created By',
//        headerStyle: styles.headerDark,
//        // cellStyle: styles.cellPink, // <- Cell style 
//        width: 220,// <- width in pixels 
//        cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
//            if (value != null) {
//                return value.name;
//            }
//            else
//                return '';
//        },
//    },

//    createdDateTime: {
//        displayName: 'Created Date',
//        headerStyle: styles.headerDark,
//        width: '15'
//    },

//    priority: {
//        displayName: 'Priority',
//        headerStyle: styles.headerDark,
//        width: '10'
//    },
//    account: {
//        displayName: 'Account',
//        headerStyle: styles.headerDark,
//        width: '20',
//        cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
//            if (value != null) {
//                return value.name;
//            }
//            else
//                return '';
//        },
//    },
//    domain: {
//        displayName: 'Domain',
//        headerStyle: styles.headerDark,
//        width: '20',
//        cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
//            if (value != null) {
//                return value.name;
//            }
//            else
//                return '';
//        },
//    },
//    estimateOfCustomer: {
//        displayName: 'Estimate Of Customer',
//        headerStyle: styles.headerDark,
//        width: '25'
//    },
//    ustShare: {
//        displayName: 'Ust Share',
//        headerStyle: styles.headerDark,
//        width: '20'
//    },
//    otherInfo: {
//        displayName: 'Other Info',
//        headerStyle: styles.headerDark,
//        width: 100
//    },
//    assumptions: {
//        displayName: 'Assumptions',
//        headerStyle: styles.headerDark,
//        width: 100
//    },
//    solutionNeedDate: {
//        displayName: 'Solution Need Date',
//        headerStyle: styles.headerDark,
//        width: 100
//    },
//    solutionPlannedClosureDate: {
//        displayName: 'Solution Planned ClosureDate',
//        headerStyle: styles.headerDark,
//        width: 100
//    },
//    owner: {
//        displayName: 'Owner',
//        headerStyle: styles.headerDark,
//        width: 100,
//        cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
//            if (value != null) {
//                return value.name;
//            }
//            else
//                return '';
//        },
//    },
//    phase: {
//        displayName: 'Phase',
//        headerStyle: styles.headerDark,
//        width: 100,
//        cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
//            if (value != null) {
//                return value.name;
//            }
//            else
//                return '';
//        },
//    },
//    status: {
//        displayName: 'Status',
//        headerStyle: styles.headerDark,
//        width: 100,
//        cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
//            if (value != null) {
//                return value.name;
//            }
//            else
//                return '';
//        },
//    },
//    vertical: {
//        displayName: 'Vertical',
//        headerStyle: styles.headerDark,
//        width: 100,
//        cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
//            console.log(value);
//            if (value != null) {
//                return value[0].name;
//            }
//            else
//                return '';
//        },
//    },
//    solutionApproach: {
//        displayName: 'Solution Approach',
//        headerStyle: styles.headerDark,
//        width: 100
//    },
//    category: {
//        displayName: 'Category',
//        headerStyle: styles.headerDark,
//        width: 100,
//        cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
//            if (value[0] != null) {
//                return value[0].name;
//            }
//            else
//                return '';
//        },
//    }

//}


//exports.get = function (req, res, next) {
//    var Sequence = exports.Sequence || require('sequence').Sequence, sequence = Sequence.create(), err;
//    sequence
//    .then(function (next, err) {
//        Problem.find({ status: { $ne: null }, phase: { $ne: null } }).limit(parseInt(req.params.limit)).skip(parseInt(req.params.skip)).sort({ updatedDateTime: -1 })
//        .populate([{ path: 'status', select: 'name class' },
//                   { path: 'comments.commentedBy', select: 'name' },
//                   { path: 'views', select: 'name' },
//                   { path: 'createdBy', populate: { path: 'role', model: 'role' } },
//                   { path: 'contributors', select: 'name' },
//                   { path: 'customerStakeholders', select: 'name' },
//                   { path: 'category', select: 'name' },
//                   { path: 'domain', select: 'name' },
//                   { path: 'account', select: 'name' },
//                   { path: 'phase', populate: { path: 'phase', model: 'phase' } },
//                   { path: 'tags.accountId', select: 'name' },
//                   { path: 'tags.categoryId', select: 'name' },
//                   { path: 'vertical', select: 'name' },
//                   { path: 'likes.user', select: 'name' },
//                   { path: 'labels', select: 'name' }
//        ])
//        .exec(function (err, response) {
//            //  console.log(response);

//            if (err) return next(err, "");
//            next(err, response);
//        });
//    }).then(function (next, err, problem) {


//        // The data set should have the following shape (Array of Objects) 
//        // The order of the keys is irrelevant, it is also irrelevant if the 
//        // dataset contains more fields as the report is build based on the 
//        // specification provided above. But you should have all the fields 
//        // that are listed in the report specification 
//        // Create the excel report. 
//        // This function will return Buffer 
//        var report = excel.buildExport(
//          [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report 
//            {
//                name: 'Sheet name', // <- Specify sheet name (optional) 
//                // heading: heading, // <- Raw heading array (optional) 
//                specification: specification, // <- Report specification 
//                data: problem // <-- Report data 
//            }
//          ]
//        );
//        // You can then return this straight 
//        res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers) 
//        return res.send(report);
//    });
//}

exports.exportAllProblems = function (req, res, next) {

    var Sequence = exports.Sequence || require('sequence').Sequence, sequence = Sequence.create(), err;
    sequence
    .then(function (next, err) {
        Problem.find({ status: { $ne: null }, phase: { $ne: null } }).limit(parseInt(req.params.limit)).skip(parseInt(req.params.skip)).sort({ updatedDateTime: -1 })
        .populate([{ path: 'status', select: 'name class' },
                   { path: 'comments.commentedBy', select: 'name' },
                   { path: 'views', select: 'name' },
                   { path: 'createdBy', populate: { path: 'role', model: 'role' } },
                   { path: 'contributors', select: 'name' },
                   { path: 'customerStakeholders', select: 'name' },
                   { path: 'category', select: 'name' },
                   { path: 'domain', select: 'name' },
                   { path: 'account', model: 'account', populate: [{ path: 'vertical', model: 'vertical' }, { path: 'domain', model: 'domain' }] },
                   { path: 'phase', populate: { path: 'phase', model: 'phase' } },
                   { path: 'tags.accountId', select: 'name' },
                   { path: 'tags.categoryId', select: 'name' },
                   { path: 'vertical', select: 'name' },
                   { path: 'likes.user', select: 'name' },
                   { path: 'labels', select: 'name' },
                   { path: 'owner', select: 'name' },
                   { path: 'approach', select: 'name' },
                   { path: 'approvalStatus.approvedUser', select: 'name' },
                   { path: 'solutionContributors', select: 'name' },
                   { path: 'innovationChampion', select: 'name' }
        ])
        .exec(function (err, response) {
            if (err) return next(err, "");
            next(err, response);
        });
    }).then(function (next, err, problems) {

        var workbook = new Excel.Workbook();
        // workbook.creator = 'Me';
        // workbook.lastModifiedBy = 'Her';
        workbook.created = new Date();
        workbook.modified = new Date();

        workbook.views = [
      {
          x: 0, y: 0, width: 10000, height: 20000,
          firstSheet: 0, activeTab: 1, visibility: 'visible'
      }
        ]

        var sheet = workbook.addWorksheet('Business Problems');

        var worksheet = workbook.getWorksheet('Business Problems');

        worksheet.views = [
        { state: 'frozen', xSplit: 2, ySplit: 3, activeCell: 'A1' }
        ];

        worksheet.columns = [
        { header: 'ProblemId', key: 'problemId', width: 20 },
        { header: 'Title', key: 'title', width: 50 },
        { header: 'Problem Statement', key: 'problemStatement', width: 50 },
        { header: 'Business Impact', key: 'businessImpact', width: 50 },
        { header: 'Created By', key: 'createdBy', width: 30 },
        { header: 'Created Date', key: 'createdDate', width: 30 },
        { header: 'Priority ', key: 'priority', width: 20 },
        { header: 'Account  ', key: 'account', width: 20 },
        { header: 'Domain  ', key: 'domain', width: 20 },
        { header: 'Estimated Customer Spend', key: 'estimateOfCustomer', width: 30 },
        { header: 'UST Wallet Share', key: 'ustShare', width: 20 },
        { header: 'Other Info', key: 'otherInfo', width: 20 },
        { header: 'Assumptions ', key: 'assumptions', width: 20 },
        { header: 'Solution Need Date', key: 'solutionNeedDate', width: 25 },
        { header: 'Solution Closure Date', key: 'solutionPlannedClosureDate', width: 25 },
        { header: 'Innovation Champion', key: 'innovationChampion', width: 20 },
        { header: 'Closed By', key: 'closedBy', width: 20 },
        { header: 'Phase', key: 'phase', width: 20 },
        { header: 'Status', key: 'status', width: 20 },
        { header: 'Vertical', key: 'vertical', width: 20 },
        { header: 'Solution Approach', key: 'solutionApproach', width: 20 },
        { header: 'Category ', key: 'category', width: 20 },
        { header: 'Contributors ', key: 'contributor', width: 20 },
        { header: 'Label  ', key: 'label', width: 20 },
        { header: 'Solution Contributors', key: 'solutionContributors', width: 30 },
        { header: 'Approval Status', key: 'approvalStatus', width: 20 },
        { header: 'Customer Stackholder', key: 'customerStackholder', width: 30 },
        { header: 'Customer Gain', key: 'customerGain', width: 30 },
        { header: 'Customer Pain', key: 'customerPain', width: 30 }
        ];

        var status = worksheet.getColumn('Z');
        status.header = ['Approval Status', 'Status'];
        status.key = 'approvalStatus';

        var approvalDate = worksheet.getColumn('AA');
        approvalDate.header = ['Approval Status', 'Approval Date'];
        approvalDate.key = 'approvalDate';

        var approvedBy = worksheet.getColumn('AB');
        approvedBy.header = ['Approval Status', 'Approved By'];
        approvedBy.key = 'approvedBy';

        var stackholderName = worksheet.getColumn('AC');
        stackholderName.header = ['Customer stakeholder', 'Name'];
        stackholderName.key = 'stackholderName';

        var stackholderRole = worksheet.getColumn('AD');
        stackholderRole.header = ['Customer stakeholder', 'Role'];
        stackholderRole.key = 'stackholderRole';


        var customerGainDescription = worksheet.getColumn('AE');
        customerGainDescription.header = ['Customer Gain', 'Description'];
        customerGainDescription.key = 'customerGainDescription';

        var customerGainQuantifiedValue = worksheet.getColumn('AF');
        customerGainQuantifiedValue.header = ['Customer Gain', 'Quantified Value'];
        customerGainQuantifiedValue.key = 'customerGainQuantifiedValue';

        var customerGainImpactedTask = worksheet.getColumn('AG');
        customerGainImpactedTask.header = ['Customer Gain', 'Impacted Task'];
        customerGainImpactedTask.key = 'customerGainImpactedTask';

        var customerGainStackholder = worksheet.getColumn('AH');
        customerGainStackholder.header = ['Customer Gain', 'Customer stakeholder'];
        customerGainStackholder.key = 'customerGainStackholder';

        var customerGainStackholderName = worksheet.getColumn('AH');
        customerGainStackholderName.header = ['Customer Gain', 'Customer stakeholder', 'Name'];
        customerGainStackholderName.key = 'customerGainStackholderName';


        var customerGainStackholderName = worksheet.getColumn('AI');
        customerGainStackholderName.header = ['Customer Gain', 'Customer stakeholder', 'Role'];
        customerGainStackholderName.key = 'customerGainStackholderRole';


        var customerGainDescription = worksheet.getColumn('AJ');
        customerGainDescription.header = ['Customer Pain', 'Description'];
        customerGainDescription.key = 'customerPainDescription';

        var customerGainQuantifiedValue = worksheet.getColumn('AK');
        customerGainQuantifiedValue.header = ['Customer Pain', 'Quantified Value'];
        customerGainQuantifiedValue.key = 'customerPainQuantifiedValue';

        var customerGainImpactedTask = worksheet.getColumn('AL');
        customerGainImpactedTask.header = ['Customer Pain', 'Impacted Task'];
        customerGainImpactedTask.key = 'customerPainImpactedTask';

        var customerGainStackholder = worksheet.getColumn('AM');
        customerGainStackholder.header = ['Customer Pain', 'Customer stakeholder'];
        customerGainStackholder.key = 'customerPainStackholder';

        var customerGainStackholderName = worksheet.getColumn('AM');
        customerGainStackholderName.header = ['Customer Pain', 'Customer stakeholder', 'Name'];
        customerGainStackholderName.key = 'customerPainStackholderName';


        var customerGainStackholderName = worksheet.getColumn('AN');
        customerGainStackholderName.header = ['Customer Pain', 'Customer stakeholder', 'Role'];
        customerGainStackholderName.key = 'customerPainStackholderRole';

        worksheet.mergeCells('A1:A3');
        worksheet.mergeCells('B1:B3');
        worksheet.mergeCells('C1:C3');
        worksheet.mergeCells('D1:D3');
        worksheet.mergeCells('E1:E3');
        worksheet.mergeCells('F1:F3');
        worksheet.mergeCells('G1:G3');
        worksheet.mergeCells('H1:H3');
        worksheet.mergeCells('I1:I3');
        worksheet.mergeCells('J1:J3');
        worksheet.mergeCells('K1:K3');
        worksheet.mergeCells('L1:L3');
        worksheet.mergeCells('M1:M3');
        worksheet.mergeCells('N1:N3');
        worksheet.mergeCells('O1:O3');
        worksheet.mergeCells('P1:P3');
        worksheet.mergeCells('Q1:Q3');
        worksheet.mergeCells('R1:R3');
        worksheet.mergeCells('S1:S3');
        worksheet.mergeCells('T1:T3');
        worksheet.mergeCells('U1:U3');
        worksheet.mergeCells('V1:V3');
        worksheet.mergeCells('W1:W3');
        worksheet.mergeCells('X1:X3');
        worksheet.mergeCells('Y1:Y3');
        worksheet.mergeCells('Z2:Z3');
        worksheet.mergeCells('Z1:AB1');
        worksheet.mergeCells('AC1:AD1');
        worksheet.mergeCells('AA2:AA3');
        worksheet.mergeCells('AB2:AB3');
        worksheet.mergeCells('AC2:AC3');
        worksheet.mergeCells('AD2:AD3');
        worksheet.mergeCells('AE1:AI1');
        worksheet.mergeCells('AE2:AE3');
        worksheet.mergeCells('AF2:AF3');
        worksheet.mergeCells('AG2:AG3');
        worksheet.mergeCells('AH2:AI2');
        worksheet.mergeCells('AJ1:AN1');
        worksheet.mergeCells('AJ2:AJ3');
        worksheet.mergeCells('AK2:AK3');
        worksheet.mergeCells('AL2:AL3');
        worksheet.mergeCells('AM2:AN2');

        worksheet.getCell('A1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('B1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('C1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('D1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('E1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('F1').font = {
            family: 4,
            size: 13,
            bold: true
        };


        worksheet.getCell('G1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('H1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('I1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('J1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('K1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('L1').font = {
            family: 4,
            size: 13,
            bold: true
        };



        worksheet.getCell('M1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('N1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('O1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('P1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('Q1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('R1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('S1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('T1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('U1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('V1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('W1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('X1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('Y1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('Z1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AA1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AB1').font = {
            family: 4,
            size: 13,
            bold: true
        };
        worksheet.getCell('AC1').font = {
            family: 4,
            size: 13,
            bold: true
        };
        worksheet.getCell('AD1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AE1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AF1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AG1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AH1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AI1').font = {
            family: 4,
            size: 13,
            bold: true
        };


        worksheet.getCell('AJ1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AK1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AL1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AM1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AN1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('Z2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AA2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AB2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AC2').font = {
            family: 4,
            size: 13,
            bold: true
        };
        worksheet.getCell('AD2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AE2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AF2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AG2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AH2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AI2').font = {
            family: 4,
            size: 13,
            bold: true
        };



        worksheet.getCell('AJ2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AK2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AL2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AM2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AN2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AH3').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AI3').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AM3').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AN3').font = {
            family: 4,
            size: 13,
            bold: true
        };
        var rownum = 3;
        for (var problem in problems) {

            rownum++;
            var problemDetails = problems[problem];
            var contributors = "";
            var solutioncontributors = "";
            var labels = "";
            if (problemDetails.contributors != null) {
                if (problemDetails.contributors.length > 0) {
                    for (var i = 1; i <= problemDetails.contributors.length; i++) {
                        contributors = contributors + i + '. ' + problemDetails.contributors[i - 1].name + ', ';
                    }
                }
            }

            if (problemDetails.solutionContributors != null) {
                if (problemDetails.solutionContributors.length > 0) {
                    for (var i = 1; i <= problemDetails.solutionContributors.length; i++) {
                        solutioncontributors = solutioncontributors + i + '. ' + problemDetails.solutionContributors[i - 1].name + ', ';
                    }
                }
            }

            if (problemDetails.labels != null) {
                if (problemDetails.labels.length > 0) {
                    for (var i = 1; i <= problemDetails.labels.length; i++) {
                        labels = labels + i + '. ' + problemDetails.labels[i - 1].name + ', ';
                    }
                }
            }

            worksheet.addRow({
                problemId: problemDetails.problemId,
                title: problemDetails.title,
                problemStatement: problemDetails.problemStatement,
                businessImpact: problemDetails.businessImpact,
                createdBy: (problemDetails.createdBy != null) ? problemDetails.createdBy.name : '',
                createdDate: problemDetails.createdDate,
                priority: problemDetails.priority,
                account: problemDetails.account.name,
                domain: (problemDetails.domain != null) ? problemDetails.domain.name : '',
                estimateOfCustomer: problemDetails.estimateOfCustomer,
                ustShare: problemDetails.ustShare,
                otherInfo: problemDetails.otherInfo,
                assumptions: problemDetails.assumptions,
                solutionNeedDate: problemDetails.solutionNeedDate,
                solutionPlannedClosureDate: problemDetails.solutionPlannedClosureDate,
                innovationChampion: (problemDetails.innovationChampion != null) ? problemDetails.innovationChampion.name : '',
                closedBy: problemDetails.closedBy,
                phase: problemDetails.phase.name,
                status: problemDetails.status.name,
                vertical: (problemDetails.vertical != null && problemDetails.vertical.length >0) ? problemDetails.vertical[0].name : '',
                solutionApproach: (problemDetails.approach != null) ? problemDetails.approach.name : '',
                category: (problemDetails.category[0] != null) ? problemDetails.category[0].name : '',
                approvedBy: (problemDetails.approvalStatus != null && problemDetails.approvalStatus.approvedUser != null) ? problemDetails.approvalStatus.approvedUser.name : '',
                approvalDate: (problemDetails.approvalStatus != null) ? problemDetails.approvalStatus.approvalDate : '',
                approvalStatus: (problemDetails.approvalStatus != null) ? problemDetails.approvalStatus.approvalStatus : '',
                contributor: contributors,
                label: labels,
                solutionContributors: solutioncontributors,
                stackholderName: (problemDetails.customerStakeholders != null && problemDetails.customerStakeholders.length > 0) ? problemDetails.customerStakeholders[0].name : '',
                stackholderRole: (problemDetails.customerStakeholders != null && problemDetails.customerStakeholders.length > 0) ? problemDetails.customerStakeholders[0].role : '',
                createdDate: (problemDetails.createdDateTime != null) ? problemDetails.createdDateTime : '',
                customerGainDescription: (problemDetails.customerGains != null && problemDetails.customerGains.length > 0) ? problemDetails.customerGains[0].description : '',
                customerGainQuantifiedValue: (problemDetails.customerGains != null && problemDetails.customerGains.length > 0) ? problemDetails.customerGains[0].quantifiedValue : '',
                customerGainImpactedTask: (problemDetails.customerGains != null && problemDetails.customerGains.length > 0) ? problemDetails.customerGains[0].impactedTask : '',
                customerGainStackholderName: (problemDetails.customerGains != null && problemDetails.customerGains.length > 0) ? problemDetails.customerGains[0].stackholders[0].name : '',
                customerGainStackholderRole: (problemDetails.customerGains != null && problemDetails.customerGains.length > 0) ? problemDetails.customerGains[0].stackholders[0].role : '',

                customerPainDescription: (problemDetails.customerPains != null && problemDetails.customerPains.length > 0) ? problemDetails.customerPains[0].description : '',
                customerPainQuantifiedValue: (problemDetails.customerPains != null && problemDetails.customerPains.length > 0) ? problemDetails.customerPains[0].quantifiedValue : '',
                customerPainImpactedTask: (problemDetails.customerPains != null && problemDetails.customerPains.length > 0) ? problemDetails.customerPains[0].impactedTask : '',
                customerPainStackholderName: (problemDetails.customerPains != null && problemDetails.customerPains.length > 0) ? problemDetails.customerPains[0].stackholders[0].name : '',
                customerPainStackholderRole: (problemDetails.customerPains != null && problemDetails.customerPains.length > 0) ? problemDetails.customerPains[0].stackholders[0].role : '',
                //label: (problemDetails.vertical != null) ? problemDetails.vertical[0].name : '',
            });

            if (problemDetails.customerGains.length > 1 || problemDetails.customerPains.length > 1 || problemDetails.customerStakeholders.length > 1) {
                var len = problemDetails.customerGains.length;

                if (problemDetails.customerPains.length > len) {
                    len = problemDetails.customerPains.length;
                }

                if (len < problemDetails.customerStakeholders.length) {
                    len = problemDetails.customerStakeholders.length;
                }

                var subrowCount = rownum;
                for (var i = 1; i < len; i++) {
                    subrowCount++;

                    if (problemDetails.customerStakeholders.length > i) {
                        console.log(problemDetails.customerStakeholders[i].name);

                    }
                    worksheet.addRow({

                        stackholderName: (problemDetails.customerStakeholders.length > i) ? problemDetails.customerStakeholders[i].name : '',
                        stackholderRole: (problemDetails.customerStakeholders.length > i) ? problemDetails.customerStakeholders[i].role : '',


                        customerGainDescription: (problemDetails.customerGains.length > i) ? problemDetails.customerGains[i].description : '',
                        customerGainQuantifiedValue: (problemDetails.customerGains.length > i) ? problemDetails.customerGains[i].quantifiedValue : '',
                        customerGainImpactedTask: (problemDetails.customerGains.length > i) ? problemDetails.customerGains[i].impactedTask : '',
                        customerGainStackholderName: (problemDetails.customerGains.length > i) ? problemDetails.customerGains[i].stackholders[0].name : '',
                        customerGainStackholderRole: (problemDetails.customerGains.length > i) ? problemDetails.customerGains[i].stackholders[0].role : '',

                        customerPainDescription: (problemDetails.customerPains.length > i) ? problemDetails.customerPains[i].description : '',
                        customerPainQuantifiedValue: (problemDetails.customerPains.length > i) ? problemDetails.customerPains[i].quantifiedValue : '',
                        customerPainImpactedTask: (problemDetails.customerPains.length > i) ? problemDetails.customerPains[i].impactedTask : '',
                        customerPainStackholderName: (problemDetails.customerPains.length > i) ? problemDetails.customerPains[i].stackholders[0].name : '',
                        customerPainStackholderRole: (problemDetails.customerPains.length > i) ? problemDetails.customerPains[i].stackholders[0].role : '',
                    });

                }

                if (rownum < subrowCount) {

                    worksheet.mergeCells('"A' + rownum + ':A' + subrowCount + '"');
                    worksheet.mergeCells('"B' + rownum + ':B' + subrowCount + '"');
                    worksheet.mergeCells('"C' + rownum + ':C' + subrowCount + '"');
                    worksheet.mergeCells('"D' + rownum + ':D' + subrowCount + '"');
                    worksheet.mergeCells('"E' + rownum + ':E' + subrowCount + '"');
                    worksheet.mergeCells('"F' + rownum + ':F' + subrowCount + '"');
                    worksheet.mergeCells('"G' + rownum + ':G' + subrowCount + '"');
                    worksheet.mergeCells('"H' + rownum + ':H' + subrowCount + '"');
                    worksheet.mergeCells('"I' + rownum + ':I' + subrowCount + '"');
                    worksheet.mergeCells('"J' + rownum + ':J' + subrowCount + '"');
                    worksheet.mergeCells('"K' + rownum + ':K' + subrowCount + '"');
                    worksheet.mergeCells('"L' + rownum + ':L' + subrowCount + '"');
                    worksheet.mergeCells('"M' + rownum + ':M' + subrowCount + '"');
                    worksheet.mergeCells('"N' + rownum + ':N' + subrowCount + '"');
                    worksheet.mergeCells('"O' + rownum + ':O' + subrowCount + '"');
                    worksheet.mergeCells('"P' + rownum + ':P' + subrowCount + '"');
                    worksheet.mergeCells('"Q' + rownum + ':Q' + subrowCount + '"');
                    worksheet.mergeCells('"R' + rownum + ':R' + subrowCount + '"');
                    worksheet.mergeCells('"S' + rownum + ':S' + subrowCount + '"');
                    worksheet.mergeCells('"T' + rownum + ':T' + subrowCount + '"');
                    worksheet.mergeCells('"U' + rownum + ':U' + subrowCount + '"');
                    worksheet.mergeCells('"V' + rownum + ':V' + subrowCount + '"');
                    worksheet.mergeCells('"W' + rownum + ':W' + subrowCount + '"');
                    worksheet.mergeCells('"X' + rownum + ':X' + subrowCount + '"');
                    worksheet.mergeCells('"Y' + rownum + ':Y' + subrowCount + '"');
                    worksheet.mergeCells('"Z' + rownum + ':Z' + subrowCount + '"');
                    worksheet.mergeCells('"AA' + rownum + ':AA' + subrowCount + '"');
                    worksheet.mergeCells('"AB' + rownum + ':AB' + subrowCount + '"');
                    //worksheet.mergeCells('"AC' + rownum + ':AC' + subrowCount + '"');
                    //worksheet.mergeCells('"AD' + rownum + ':AD' + subrowCount + '"');

                    rownum = subrowCount;

                }
            }
        }

        var tempFilePath = './BusinessProblem.xlsx';

        workbook.xlsx.writeFile(tempFilePath).then(function () {
            res.download('./BusinessProblem.xlsx');
        });
    });
};


exports.exportByProblemId = function (req, res, next) {

    var problemIds = req.body.problems;
    var ObjectId = mongoose.Types.ObjectId;
    var Sequence = exports.Sequence || require('sequence').Sequence, sequence = Sequence.create(), err;
    sequence
    .then(function (next, err) {
        var problemId = [];
        for (var i = 0; i < problemIds.length; i++) {
            problemId.push(ObjectId(problemIds[i]));
        }
        Problem.find({ status: { $ne: null }, phase: { $ne: null }, "_id": { "$in": problemId } }).limit(parseInt(req.params.limit)).skip(parseInt(req.params.skip)).sort({ updatedDateTime: -1 })
       .populate([{ path: 'status', select: 'name class' },
                   { path: 'comments.commentedBy', select: 'name' },
                   { path: 'views', select: 'name' },
                   { path: 'createdBy', populate: { path: 'role', model: 'role' } },
                   { path: 'contributors', select: 'name' },
                   { path: 'customerStakeholders', select: 'name' },
                   { path: 'category', select: 'name' },
                   { path: 'domain', select: 'name' },
                   { path: 'account', model: 'account', populate: [{ path: 'vertical', model: 'vertical' }, { path: 'domain', model: 'domain' }] },
                   { path: 'phase', populate: { path: 'phase', model: 'phase' } },
                   { path: 'tags.accountId', select: 'name' },
                   { path: 'tags.categoryId', select: 'name' },
                   { path: 'vertical', select: 'name' },
                   { path: 'likes.user', select: 'name' },
                   { path: 'labels', select: 'name' },
                   { path: 'owner', select: 'name' },
                   { path: 'approach', select: 'name' },
                   { path: 'approvalStatus.approvedUser', select: 'name' },
                   { path: 'solutionContributors', select: 'name' },
                   { path: 'innovationChampion', select: 'name' }
       ])
        .exec(function (err, response) {
            if (err) return next(err, "");
            next(err, response);
        });
    }).then(function (next, err, problems) {

        var workbook = new Excel.Workbook();
        // workbook.creator = 'Me';
        // workbook.lastModifiedBy = 'Her';
        workbook.created = new Date();
        workbook.modified = new Date();

        workbook.views = [
      {
          x: 0, y: 0, width: 10000, height: 20000,
          firstSheet: 0, activeTab: 1, visibility: 'visible'
      }
        ]

        var sheet = workbook.addWorksheet('Business Problems');

        var worksheet = workbook.getWorksheet('Business Problems');

        worksheet.views = [
        { state: 'frozen', xSplit: 2, ySplit: 3, activeCell: 'A1' }
        ];

        worksheet.columns = [
        { header: 'ProblemId', key: 'problemId', width: 20 },
        { header: 'Title', key: 'title', width: 50 },
        { header: 'Problem Statement', key: 'problemStatement', width: 50 },
        { header: 'Business Impact', key: 'businessImpact', width: 50 },
        { header: 'Created By', key: 'createdBy', width: 30 },
        { header: 'Created Date', key: 'createdDate', width: 30 },
        { header: 'Priority ', key: 'priority', width: 20 },
        { header: 'Account  ', key: 'account', width: 20 },
        { header: 'Domain  ', key: 'domain', width: 20 },
        { header: 'Estimated Customer Spend', key: 'estimateOfCustomer', width: 30 },
        { header: 'UST Wallet Share', key: 'ustShare', width: 20 },
        { header: 'Other Info', key: 'otherInfo', width: 20 },
        { header: 'Assumptions ', key: 'assumptions', width: 20 },
        { header: 'Solution Need Date', key: 'solutionNeedDate', width: 25 },
        { header: 'Solution Closure Date', key: 'solutionPlannedClosureDate', width: 25 },
        { header: 'Innovation Champion', key: 'innovationChampion', width: 20 },
        { header: 'Closed By', key: 'closedBy', width: 20 },
        { header: 'Phase', key: 'phase', width: 20 },
        { header: 'Status', key: 'status', width: 20 },
        { header: 'Vertical', key: 'vertical', width: 20 },
        { header: 'Solution Approach', key: 'solutionApproach', width: 20 },
        { header: 'Category ', key: 'category', width: 20 },
        { header: 'Contributors ', key: 'contributor', width: 20 },
        { header: 'Label  ', key: 'label', width: 20 },
        { header: 'Solution Contributors', key: 'solutionContributors', width: 30 },
        { header: 'Approval Status', key: 'approvalStatus', width: 20 },
        { header: 'Customer Stackholder', key: 'customerStackholder', width: 30 },
        { header: 'Customer Gain', key: 'customerGain', width: 30 },
        { header: 'Customer Pain', key: 'customerPain', width: 30 }
        ];

        var status = worksheet.getColumn('Z');
        status.header = ['Approval Status', 'Status'];
        status.key = 'approvalStatus';

        var approvalDate = worksheet.getColumn('AA');
        approvalDate.header = ['Approval Status', 'Approval Date'];
        approvalDate.key = 'approvalDate';

        var approvedBy = worksheet.getColumn('AB');
        approvedBy.header = ['Approval Status', 'Approved By'];
        approvedBy.key = 'approvedBy';

        var stackholderName = worksheet.getColumn('AC');
        stackholderName.header = ['Customer stakeholder', 'Name'];
        stackholderName.key = 'stackholderName';

        var stackholderRole = worksheet.getColumn('AD');
        stackholderRole.header = ['Customer stakeholder', 'Role'];
        stackholderRole.key = 'stackholderRole';


        var customerGainDescription = worksheet.getColumn('AE');
        customerGainDescription.header = ['Customer Gain', 'Description'];
        customerGainDescription.key = 'customerGainDescription';

        var customerGainQuantifiedValue = worksheet.getColumn('AF');
        customerGainQuantifiedValue.header = ['Customer Gain', 'Quantified Value'];
        customerGainQuantifiedValue.key = 'customerGainQuantifiedValue';

        var customerGainImpactedTask = worksheet.getColumn('AG');
        customerGainImpactedTask.header = ['Customer Gain', 'Impacted Task'];
        customerGainImpactedTask.key = 'customerGainImpactedTask';

        var customerGainStackholder = worksheet.getColumn('AH');
        customerGainStackholder.header = ['Customer Gain', 'Customer stakeholder'];
        customerGainStackholder.key = 'customerGainStackholder';

        var customerGainStackholderName = worksheet.getColumn('AH');
        customerGainStackholderName.header = ['Customer Gain', 'Customer stakeholder', 'Name'];
        customerGainStackholderName.key = 'customerGainStackholderName';


        var customerGainStackholderName = worksheet.getColumn('AI');
        customerGainStackholderName.header = ['Customer Gain', 'Customer stakeholder', 'Role'];
        customerGainStackholderName.key = 'customerGainStackholderRole';


        var customerGainDescription = worksheet.getColumn('AJ');
        customerGainDescription.header = ['Customer Pain', 'Description'];
        customerGainDescription.key = 'customerPainDescription';

        var customerGainQuantifiedValue = worksheet.getColumn('AK');
        customerGainQuantifiedValue.header = ['Customer Pain', 'Quantified Value'];
        customerGainQuantifiedValue.key = 'customerPainQuantifiedValue';

        var customerGainImpactedTask = worksheet.getColumn('AL');
        customerGainImpactedTask.header = ['Customer Pain', 'Impacted Task'];
        customerGainImpactedTask.key = 'customerPainImpactedTask';

        var customerGainStackholder = worksheet.getColumn('AM');
        customerGainStackholder.header = ['Customer Pain', 'Customer stakeholder'];
        customerGainStackholder.key = 'customerPainStackholder';

        var customerGainStackholderName = worksheet.getColumn('AM');
        customerGainStackholderName.header = ['Customer Pain', 'Customer stakeholder', 'Name'];
        customerGainStackholderName.key = 'customerPainStackholderName';


        var customerGainStackholderName = worksheet.getColumn('AN');
        customerGainStackholderName.header = ['Customer Pain', 'Customer stakeholder', 'Role'];
        customerGainStackholderName.key = 'customerPainStackholderRole';

        worksheet.mergeCells('A1:A3');
        worksheet.mergeCells('B1:B3');
        worksheet.mergeCells('C1:C3');
        worksheet.mergeCells('D1:D3');
        worksheet.mergeCells('E1:E3');
        worksheet.mergeCells('F1:F3');
        worksheet.mergeCells('G1:G3');
        worksheet.mergeCells('H1:H3');
        worksheet.mergeCells('I1:I3');
        worksheet.mergeCells('J1:J3');
        worksheet.mergeCells('K1:K3');
        worksheet.mergeCells('L1:L3');
        worksheet.mergeCells('M1:M3');
        worksheet.mergeCells('N1:N3');
        worksheet.mergeCells('O1:O3');
        worksheet.mergeCells('P1:P3');
        worksheet.mergeCells('Q1:Q3');
        worksheet.mergeCells('R1:R3');
        worksheet.mergeCells('S1:S3');
        worksheet.mergeCells('T1:T3');
        worksheet.mergeCells('U1:U3');
        worksheet.mergeCells('V1:V3');
        worksheet.mergeCells('W1:W3');
        worksheet.mergeCells('X1:X3');
        worksheet.mergeCells('Y1:Y3');
        worksheet.mergeCells('Z2:Z3');
        worksheet.mergeCells('Z1:AB1');
        worksheet.mergeCells('AC1:AD1');
        worksheet.mergeCells('AA2:AA3');
        worksheet.mergeCells('AB2:AB3');
        worksheet.mergeCells('AC2:AC3');
        worksheet.mergeCells('AD2:AD3');
        worksheet.mergeCells('AE1:AI1');
        worksheet.mergeCells('AE2:AE3');
        worksheet.mergeCells('AF2:AF3');
        worksheet.mergeCells('AG2:AG3');
        worksheet.mergeCells('AH2:AI2');
        worksheet.mergeCells('AJ1:AN1');
        worksheet.mergeCells('AJ2:AJ3');
        worksheet.mergeCells('AK2:AK3');
        worksheet.mergeCells('AL2:AL3');
        worksheet.mergeCells('AM2:AN2');

        worksheet.getCell('A1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('B1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('C1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('D1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('E1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('F1').font = {
            family: 4,
            size: 13,
            bold: true
        };


        worksheet.getCell('G1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('H1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('I1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('J1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('K1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('L1').font = {
            family: 4,
            size: 13,
            bold: true
        };



        worksheet.getCell('M1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('N1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('O1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('P1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('Q1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('R1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('S1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('T1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('U1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('V1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('W1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('X1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('Y1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('Z1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AA1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AB1').font = {
            family: 4,
            size: 13,
            bold: true
        };
        worksheet.getCell('AC1').font = {
            family: 4,
            size: 13,
            bold: true
        };
        worksheet.getCell('AD1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AE1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AF1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AG1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AH1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AI1').font = {
            family: 4,
            size: 13,
            bold: true
        };



        worksheet.getCell('AJ1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AK1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AL1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AM1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AN1').font = {
            family: 4,
            size: 13,
            bold: true
        };




        worksheet.getCell('Z2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AA2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AB2').font = {
            family: 4,
            size: 13,
            bold: true
        };
        worksheet.getCell('AC2').font = {
            family: 4,
            size: 13,
            bold: true
        };
        worksheet.getCell('AD2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AE2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AF2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AG2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AH2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AI2').font = {
            family: 4,
            size: 13,
            bold: true
        };



        worksheet.getCell('AJ2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AK2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AL2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AM2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AN2').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AH3').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AI3').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AM3').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('AN3').font = {
            family: 4,
            size: 13,
            bold: true
        };
        var rownum = 3;
        for (var problem in problems) {

            rownum++;
            var problemDetails = problems[problem];
            var contributors = "";
            var solutioncontributors = "";
            var labels = "";
            if (problemDetails.contributors != null) {
                if (problemDetails.contributors.length > 0) {
                    for (var i = 1; i <= problemDetails.contributors.length; i++) {
                        contributors = contributors + i + '. ' + problemDetails.contributors[i - 1].name + ', ';
                    }
                }
            }

            if (problemDetails.solutionContributors != null) {
                if (problemDetails.solutionContributors.length > 0) {
                    for (var i = 1; i <= problemDetails.solutionContributors.length; i++) {
                        solutioncontributors = solutioncontributors + i + '. ' + problemDetails.solutionContributors[i - 1].name + ', ';
                    }
                }
            }

            if (problemDetails.labels != null) {
                if (problemDetails.labels.length > 0) {
                    for (var i = 1; i <= problemDetails.labels.length; i++) {
                        labels = labels + i + '. ' + problemDetails.labels[i - 1].name + ', ';
                    }
                }
            }

            worksheet.addRow({
                problemId: problemDetails.problemId,
                title: problemDetails.title,
                problemStatement: problemDetails.problemStatement,
                businessImpact: problemDetails.businessImpact,
                createdBy: (problemDetails.createdBy != null) ? problemDetails.createdBy.name : '',
                createdDate: problemDetails.createdDate,
                priority: problemDetails.priority,
                account: problemDetails.account.name,
                domain: (problemDetails.domain != null) ? problemDetails.domain.name : '',
                estimateOfCustomer: problemDetails.estimateOfCustomer,
                ustShare: problemDetails.ustShare,
                otherInfo: problemDetails.otherInfo,
                assumptions: problemDetails.assumptions,
                solutionNeedDate: problemDetails.solutionNeedDate,
                solutionPlannedClosureDate: problemDetails.solutionPlannedClosureDate,
                innovationChampion: (problemDetails.innovationChampion != null) ? problemDetails.innovationChampion.name : '',
                closedBy: problemDetails.closedBy,
                phase: problemDetails.phase.name,
                status: problemDetails.status.name,
                vertical: (problemDetails.vertical != null && problemDetails.vertical.length > 0) ? problemDetails.vertical[0].name : '',
                solutionApproach: (problemDetails.approach != null) ? problemDetails.approach.name : '',
                category: (problemDetails.category[0] != null) ? problemDetails.category[0].name : '',
                approvedBy: (problemDetails.approvalStatus != null && problemDetails.approvalStatus.approvedUser != null) ? problemDetails.approvalStatus.approvedUser.name : '',
                approvalDate: (problemDetails.approvalStatus != null) ? problemDetails.approvalStatus.approvalDate : '',
                approvalStatus: (problemDetails.approvalStatus != null) ? problemDetails.approvalStatus.approvalStatus : '',
                contributor: contributors,
                label: labels,
                solutionContributors: solutioncontributors,
                stackholderName: (problemDetails.customerStakeholders != null && problemDetails.customerStakeholders.length > 0) ? problemDetails.customerStakeholders[0].name : '',
                stackholderRole: (problemDetails.customerStakeholders != null && problemDetails.customerStakeholders.length > 0) ? problemDetails.customerStakeholders[0].role : '',
                createdDate: (problemDetails.createdDateTime != null) ? problemDetails.createdDateTime : '',
                customerGainDescription: (problemDetails.customerGains != null && problemDetails.customerGains.length > 0) ? problemDetails.customerGains[0].description : '',
                customerGainQuantifiedValue: (problemDetails.customerGains != null && problemDetails.customerGains.length > 0) ? problemDetails.customerGains[0].quantifiedValue : '',
                customerGainImpactedTask: (problemDetails.customerGains != null && problemDetails.customerGains.length > 0) ? problemDetails.customerGains[0].impactedTask : '',
                customerGainStackholderName: (problemDetails.customerGains != null && problemDetails.customerGains.length > 0) ? problemDetails.customerGains[0].stackholders[0].name : '',
                customerGainStackholderRole: (problemDetails.customerGains != null && problemDetails.customerGains.length > 0) ? problemDetails.customerGains[0].stackholders[0].role : '',

                customerPainDescription: (problemDetails.customerPains != null && problemDetails.customerPains.length > 0) ? problemDetails.customerPains[0].description : '',
                customerPainQuantifiedValue: (problemDetails.customerPains != null && problemDetails.customerPains.length > 0) ? problemDetails.customerPains[0].quantifiedValue : '',
                customerPainImpactedTask: (problemDetails.customerPains != null && problemDetails.customerPains.length > 0) ? problemDetails.customerPains[0].impactedTask : '',
                customerPainStackholderName: (problemDetails.customerPains != null && problemDetails.customerPains.length > 0) ? problemDetails.customerPains[0].stackholders[0].name : '',
                customerPainStackholderRole: (problemDetails.customerPains != null && problemDetails.customerPains.length > 0) ? problemDetails.customerPains[0].stackholders[0].role : '',
                //label: (problemDetails.vertical != null) ? problemDetails.vertical[0].name : '',
            });

            if (problemDetails.customerGains.length > 1 || problemDetails.customerPains.length > 1 || problemDetails.customerStakeholders.length > 1) {
                var len = problemDetails.customerGains.length;

                if (problemDetails.customerPains.length > len) {
                    len = problemDetails.customerPains.length;
                }

                if (len < problemDetails.customerStakeholders.length) {
                    len = problemDetails.customerStakeholders.length;
                }

                var subrowCount = rownum;
                for (var i = 1; i < len; i++) {
                    subrowCount++;

                    if (problemDetails.customerStakeholders.length > i) {
                        console.log(problemDetails.customerStakeholders[i].name);

                    }
                    worksheet.addRow({

                        stackholderName: (problemDetails.customerStakeholders.length > i) ? problemDetails.customerStakeholders[i].name : '',
                        stackholderRole: (problemDetails.customerStakeholders.length > i) ? problemDetails.customerStakeholders[i].role : '',


                        customerGainDescription: (problemDetails.customerGains.length > i) ? problemDetails.customerGains[i].description : '',
                        customerGainQuantifiedValue: (problemDetails.customerGains.length > i) ? problemDetails.customerGains[i].quantifiedValue : '',
                        customerGainImpactedTask: (problemDetails.customerGains.length > i) ? problemDetails.customerGains[i].impactedTask : '',
                        customerGainStackholderName: (problemDetails.customerGains.length > i) ? problemDetails.customerGains[i].stackholders[0].name : '',
                        customerGainStackholderRole: (problemDetails.customerGains.length > i) ? problemDetails.customerGains[i].stackholders[0].role : '',

                        customerPainDescription: (problemDetails.customerPains.length > i) ? problemDetails.customerPains[i].description : '',
                        customerPainQuantifiedValue: (problemDetails.customerPains.length > i) ? problemDetails.customerPains[i].quantifiedValue : '',
                        customerPainImpactedTask: (problemDetails.customerPains.length > i) ? problemDetails.customerPains[i].impactedTask : '',
                        customerPainStackholderName: (problemDetails.customerPains.length > i) ? problemDetails.customerPains[i].stackholders[0].name : '',
                        customerPainStackholderRole: (problemDetails.customerPains.length > i) ? problemDetails.customerPains[i].stackholders[0].role : '',
                    });

                }

                if (rownum < subrowCount) {

                    worksheet.mergeCells('"A' + rownum + ':A' + subrowCount + '"');
                    worksheet.mergeCells('"B' + rownum + ':B' + subrowCount + '"');
                    worksheet.mergeCells('"C' + rownum + ':C' + subrowCount + '"');
                    worksheet.mergeCells('"D' + rownum + ':D' + subrowCount + '"');
                    worksheet.mergeCells('"E' + rownum + ':E' + subrowCount + '"');
                    worksheet.mergeCells('"F' + rownum + ':F' + subrowCount + '"');
                    worksheet.mergeCells('"G' + rownum + ':G' + subrowCount + '"');
                    worksheet.mergeCells('"H' + rownum + ':H' + subrowCount + '"');
                    worksheet.mergeCells('"I' + rownum + ':I' + subrowCount + '"');
                    worksheet.mergeCells('"J' + rownum + ':J' + subrowCount + '"');
                    worksheet.mergeCells('"K' + rownum + ':K' + subrowCount + '"');
                    worksheet.mergeCells('"L' + rownum + ':L' + subrowCount + '"');
                    worksheet.mergeCells('"M' + rownum + ':M' + subrowCount + '"');
                    worksheet.mergeCells('"N' + rownum + ':N' + subrowCount + '"');
                    worksheet.mergeCells('"O' + rownum + ':O' + subrowCount + '"');
                    worksheet.mergeCells('"P' + rownum + ':P' + subrowCount + '"');
                    worksheet.mergeCells('"Q' + rownum + ':Q' + subrowCount + '"');
                    worksheet.mergeCells('"R' + rownum + ':R' + subrowCount + '"');
                    worksheet.mergeCells('"S' + rownum + ':S' + subrowCount + '"');
                    worksheet.mergeCells('"T' + rownum + ':T' + subrowCount + '"');
                    worksheet.mergeCells('"U' + rownum + ':U' + subrowCount + '"');
                    worksheet.mergeCells('"V' + rownum + ':V' + subrowCount + '"');
                    worksheet.mergeCells('"W' + rownum + ':W' + subrowCount + '"');
                    worksheet.mergeCells('"X' + rownum + ':X' + subrowCount + '"');
                    worksheet.mergeCells('"Y' + rownum + ':Y' + subrowCount + '"');
                    worksheet.mergeCells('"Z' + rownum + ':Z' + subrowCount + '"');
                    worksheet.mergeCells('"AA' + rownum + ':AA' + subrowCount + '"');
                    worksheet.mergeCells('"AB' + rownum + ':AB' + subrowCount + '"');
                    //worksheet.mergeCells('"AC' + rownum + ':AC' + subrowCount + '"');
                    //worksheet.mergeCells('"AD' + rownum + ':AD' + subrowCount + '"');

                    rownum = subrowCount;

                }
            }
        }

        var tempFilePath = './www/uploads/Business Problem.xlsx';

        workbook.xlsx.writeFile(tempFilePath).then(function () {
            res.download('./www/uploads/Business Problem.xlsx');
        });
    });
};






exports.exportUserDetails = function (req, res, next) {
    var Sequence = exports.Sequence || require('sequence').Sequence, sequence = Sequence.create(), err;
    sequence
    .then(function (next, err) {
        User.find().
             populate([{ path: 'role', select: 'name' },
                       { path: 'account', select: 'name' }])
            .exec(function (err, response) {
                if (err) return next(err, "");
                next(err, response);
            });
    }).then(function (next, err, users) {

        var workbook = new Excel.Workbook();
        workbook.created = new Date();
        workbook.modified = new Date();

        workbook.views = [
      {
          x: 0, y: 0, width: 10000, height: 20000,
          firstSheet: 0, activeTab: 1, visibility: 'visible'
      }
        ]

        var sheet = workbook.addWorksheet('ID3 Users');

        var worksheet = workbook.getWorksheet('ID3 Users');

        worksheet.views = [
        { state: 'frozen', xSplit: 6, ySplit: 1, topLeftCell: 'A1', activeCell: 'A1' }
        ];

        worksheet.columns = [
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Email-ID', key: 'email', width: 30 },
        { header: 'Role', key: 'role', width: 20 },
        { header: 'Account', key: 'account' },
        { header: 'Employee-ID', key: 'username' },
        { header: 'Contact Number', key: 'contactInfo' },
        { header: 'Status', key: 'status' }
        ];

        worksheet.getCell('A1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('B1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('C1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('D1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('E1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('F1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('G1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        for (var user in users) {
            var userDetails = users[user];
            var status = 'Active';

            if (userDetails.isDelete) {
                status = 'Inactive';
            }

            worksheet.addRow({
                name: userDetails.name,
                email: userDetails.email,
                role: userDetails.role.name,
                account: (userDetails.account != null) ? userDetails.account.name : '',
                username: userDetails.username,
                contactInfo: (userDetails.contactInfo != null) ? userDetails.contactInfo : '',
                status: status
            });
        }

        var tempFilePath = './ID3 Users.xlsx';
        workbook.xlsx.writeFile(tempFilePath).then(function () {
            res.download('./ID3 Users.xlsx');
        });
    });
};

exports.exportUserDetailsByIds = function (req, res, next) {
    var userIds = req.body.users;
    var ObjectId = mongoose.Types.ObjectId;

    var Sequence = exports.Sequence || require('sequence').Sequence, sequence = Sequence.create(), err;
    sequence
    .then(function (next, err) {

        var userId = [];
        for (var i = 0; i < userIds.length; i++) {
            userId.push(ObjectId(userIds[i]));
        }

        User.find({ "_id": { "$in": userId } })
            .populate([{ path: 'role', select: 'name' },
                       { path: 'account', select: 'name' }])
            .exec(function (err, response) {
                if (err) return next(err, "");
                next(err, response);
            });
    }).then(function (next, err, users) {

        var workbook = new Excel.Workbook();
        workbook.created = new Date();
        workbook.modified = new Date();
        workbook.views = [
      {
          x: 0, y: 0, width: 10000, height: 20000,
          firstSheet: 0, activeTab: 1, visibility: 'visible'
      }
        ]


        var sheet = workbook.addWorksheet('ID3 Users');

        var worksheet = workbook.getWorksheet('ID3 Users');

        worksheet.views = [
        { state: 'frozen', xSplit: 6, ySplit: 1, topLeftCell: 'A1', activeCell: 'A1' }
        ];

        worksheet.columns = [
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Email-ID', key: 'email', width: 30 },
        { header: 'Role', key: 'role', width: 20 },
        { header: 'Account', key: 'account', width: 20 },
        { header: 'Employee-ID', key: 'username', width: 20 },
        { header: 'Contact Number', key: 'contactInfo', width: 20 },
        { header: 'status', key: 'status', width: 20 }
        ];

        worksheet.getCell('A1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('B1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('C1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('D1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('E1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('F1').font = {
            family: 4,
            size: 13,
            bold: true
        };


        worksheet.getCell('G1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        for (var user in users) {
            var userDetails = users[user];
            var status = 'Active';

            if (userDetails.isDelete) {
                status = 'Inactive';
            }

            worksheet.addRow({
                name: userDetails.name,
                email: userDetails.email,
                role: userDetails.role.name,
                account: (userDetails.account != null) ? userDetails.account.name : '',
                username: userDetails.username,
                contactInfo: (userDetails.contactInfo != null) ? userDetails.contactInfo : '',
                status: status
            });
        }

        var tempFilePath = './www/uploads/ID3 Users.xlsx';
        workbook.xlsx.writeFile(tempFilePath).then(function () {
            res.json("success");
        });
    });
};



exports.exportAccountDetails = function (req, res, next) {
    var Sequence = exports.Sequence || require('sequence').Sequence, sequence = Sequence.create(), err;
    sequence
    .then(function (next, err) {
        //User.find().
        //     populate([{ path: 'role', select: 'name' },
        //               { path: 'account', select: 'name' }])
        //    .exec(function (err, response) {
        //        if (err) return next(err, "");
        //        next(err, response);
        //    });

        Account.find({ isDelete: { $ne: true } }).sort('name')
        .populate([{ path: 'domain', select: 'name' }])
        .populate([{ path: 'vertical', select: 'name' }])
        .exec(function (err, response) {
            if (err) return next(err,"");
            next(err, response);
        });
    }).then(function (next, err, accounts) {

        var workbook = new Excel.Workbook();
        workbook.created = new Date();
        workbook.modified = new Date();

        workbook.views = [
      {
          x: 0, y: 0, width: 10000, height: 20000,
          firstSheet: 0, activeTab: 1, visibility: 'visible'
      }
        ]

        var sheet = workbook.addWorksheet('ID3 Account');

        var worksheet = workbook.getWorksheet('ID3 Account');

        worksheet.views = [
        { state: 'frozen', xSplit: 6, ySplit: 1, topLeftCell: 'A1', activeCell: 'A1' }
        ];

        worksheet.columns = [
        { header: 'Account', key: 'account', width: 20 },
        { header: 'Domain', key: 'domain', width: 30 },
        { header: 'Vertical', key: 'vertical', width: 20 },
        ];

        worksheet.getCell('A1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('B1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        worksheet.getCell('C1').font = {
            family: 4,
            size: 13,
            bold: true
        };

        for (var account in accounts) {
            var accuntDetails = accounts[account];           
            worksheet.addRow({
                account: accuntDetails.name,
                domain: (accuntDetails.domain != null) ? accuntDetails.domain.name : '',
                vertical: (accuntDetails.vertical != null) ? accuntDetails.vertical.name : '',
            });
        }

        var tempFilePath = './ID3 Account.xlsx';
        workbook.xlsx.writeFile(tempFilePath).then(function () {
            res.download('./ID3 Account.xlsx');
        });
    });
};