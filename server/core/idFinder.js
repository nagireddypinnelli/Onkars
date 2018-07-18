var mongoose = require('mongoose');


function getAccountIdFromProjectId(projectId) {
    return new Promise(function (resolve, reject) {
        Account.findOne({ projects: projectId }, function (err, account) {
            resolve(account._id);
        })
    })
}
function getOrgIdFromAccountId(accountId) {

    return new Promise(function (resolve, reject) {
        Organization.findOne({ accounts: accountId }, function (err, organization) {
            if (err) resolve(err);
            resolve(organization._id);
        })
    })
}

function getOrganizationId(id, level) {

    return new Promise(function (resolve, reject) {
        if (level == "organization") {
            resolve(id);
        }
        else if (level == "account") {
            getOrgIdFromAccountId(id).then(function (organizationId) {
                resolve(organizationId);
            })
        }
        else if (level == "project") {
            getAccountIdFromProjectId(id).then(function (accountId) {
                getOrgIdFromAccountId(accountId).then(function (organizationId) {
                    resolve(organizationId);
                })
            })
        }
    })
};

exports.getOrganizationIdByChartId = function (id, level) {
    return new Promise(function (resolve, reject) {
        getOrganizationId(id, level).then(function (organizationId) {
            resolve(organizationId);
        })
    })
}
exports.getOrganizationIdfromRefId = function (ref, id) {

    return new Promise(function (resolve, reject) {
        var obj = {};
        switch (ref) {
            case 'issues':
                obj = { 'issues': id }
                break;
            case 'risks':
                obj = { 'risks': id }
                break;
            case 'deliverables':
                obj = { 'deliverables': id }
                break;
        }
        Project.findOne(obj, function (err, project) {
            if (!project) {
                Account.findOne(obj, function (err, account) {
                    if (!account) {
                        Organization.findOne(obj, function (err, organization) {
                            if (organization) {
                                getOrganizationId(organization._id, 'organization').then(function (organizationId) {
                                    resolve(organizationId);
                                })
                            }
                        });
                    }
                    else {
                        getOrganizationId(account._id, 'account').then(function (organizationId) {
                            resolve(organizationId);
                        })
                    }
                });
            } else {
                getOrganizationId(project._id, 'project').then(function (organizationId) {
                    resolve(organizationId);
                })
            }
        });
    })
}