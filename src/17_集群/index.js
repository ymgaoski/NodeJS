/*
    cluster 集群
    能实现多核CPU同时处理信息，cluster 就是对 child_process 的包装
*/

const cluster = require('cluster');