// 铁路工务智慧巡检系统 JavaScript
// ==================== 全局变量 ====================
let currentUser = null;
let captchaText = '';
let currentEditItem = null;
let currentEditType = null;

// 数据存储（模拟数据库）
const database = {
    users: [
        { username: 'admin', password: '123456', name: '管理员' },
        { username: 'user', password: '123456', name: '巡检员' }
    ],
    employees: [
        { id: 1, name: '张建国', gender: '男', idCard: '110101198505123456', phone: '13800138001', position: '工程师', department: '检测工区', hireDate: '2010-03-15', status: '在职', education: '本科', major: '土木工程', politicalStatus: '党员', birthDate: '1985-05-12', nativePlace: '北京', emergencyContact: '张丽', emergencyPhone: '13900001111', address: '北京市朝阳区建国路88号' },
        { id: 2, name: '李明华', gender: '男', idCard: '110101198712234567', phone: '13800138002', position: '高级技师', department: '维修工区', hireDate: '2012-06-20', status: '在职', education: '大专', major: '机械维修', politicalStatus: '党员', birthDate: '1987-12-23', nativePlace: '河北石家庄', emergencyContact: '李秀英', emergencyPhone: '13900002222', address: '北京市海淀区中关村大街100号' },
        { id: 3, name: '王德胜', gender: '男', idCard: '110101199002156789', phone: '13800138003', position: '技师', department: '线路工区', hireDate: '2015-09-10', status: '在职', education: '大专', major: '铁道工程', politicalStatus: '群众', birthDate: '1990-02-15', nativePlace: '山西太原', emergencyContact: '王芳', emergencyPhone: '13900003333', address: '北京市丰台区南三环西路65号' },
        { id: 4, name: '刘芳', gender: '女', idCard: '110101199203178901', phone: '13800138004', position: '助理工程师', department: '检测工区', hireDate: '2018-04-08', status: '在职', education: '本科', major: '测绘工程', politicalStatus: '团员', birthDate: '1992-03-17', nativePlace: '天津', emergencyContact: '刘建军', emergencyPhone: '13900004444', address: '北京市东城区东直门北大街55号' },
        { id: 5, name: '陈勇', gender: '男', idCard: '110101198809234512', phone: '13800138005', position: '技师', department: '维修工区', hireDate: '2016-11-25', status: '在职', education: '中专', major: '机电一体化', politicalStatus: '群众', birthDate: '1988-09-23', nativePlace: '河南郑州', emergencyContact: '陈秀兰', emergencyPhone: '13900005555', address: '北京市西城区西直门外大街168号' },
        { id: 6, name: '赵军', gender: '男', idCard: '110101198406089012', phone: '13800138006', position: '高级工程师', department: '技术科', hireDate: '2008-07-01', status: '在职', education: '硕士', major: '桥梁工程', politicalStatus: '党员', birthDate: '1984-06-08', nativePlace: '北京', emergencyContact: '赵婷', emergencyPhone: '13900006666', address: '北京市昌平区回龙观东大街88号' },
        { id: 7, name: '孙静', gender: '女', idCard: '110101199105123456', phone: '13800138007', position: '会计', department: '财务科', hireDate: '2013-03-15', status: '在职', education: '本科', major: '会计学', politicalStatus: '群众', birthDate: '1991-05-12', nativePlace: '山东济南', emergencyContact: '孙建华', emergencyPhone: '13900007777', address: '北京市通州区果园环岛南200米' },
        { id: 8, name: '周伟', gender: '男', idCard: '110101198910156789', phone: '13800138008', position: '技师', department: '线路工区', hireDate: '2014-08-20', status: '在职', education: '大专', major: '铁路工程', politicalStatus: '团员', birthDate: '1989-10-15', nativePlace: '江苏南京', emergencyContact: '周丽', emergencyPhone: '13900008888', address: '北京市大兴区黄村镇兴华大街100号' },
        { id: 9, name: '吴娜', gender: '女', idCard: '110101199308234567', phone: '13800138009', position: '资料员', department: '办公室', hireDate: '2017-05-10', status: '在职', education: '本科', major: '档案管理', politicalStatus: '团员', birthDate: '1993-08-23', nativePlace: '浙江杭州', emergencyContact: '吴强', emergencyPhone: '13900009999', address: '北京市顺义区后沙峪镇安泰大街15号' },
        { id: 10, name: '郑强', gender: '男', idCard: '110101198707129012', phone: '13800138010', position: '工程师', department: '检测工区', hireDate: '2011-09-01', status: '在职', education: '本科', major: '电气工程', politicalStatus: '党员', birthDate: '1987-07-12', nativePlace: '湖北武汉', emergencyContact: '郑秀英', emergencyPhone: '13900010000', address: '北京市石景山区八角南路88号' },
        { id: 11, name: '钱磊', gender: '男', idCard: '110101199012013456', phone: '13800138011', position: '技师', department: '维修工区', hireDate: '2015-12-15', status: '在职', education: '大专', major: '机械制造', politicalStatus: '群众', birthDate: '1990-12-01', nativePlace: '安徽合肥', emergencyContact: '钱丽', emergencyPhone: '13900011111', address: '北京市门头沟区滨河路南100号' },
        { id: 12, name: '许敏', gender: '女', idCard: '110101199204176789', phone: '13800138012', position: '助理工程师', department: '技术科', hireDate: '2019-03-20', status: '在职', education: '本科', major: '土木工程', politicalStatus: '团员', birthDate: '1992-04-17', nativePlace: '福建厦门', emergencyContact: '许建', emergencyPhone: '13900012222', address: '北京市房山区长阳镇加州水郡东区' },
        { id: 13, name: '何涛', gender: '男', idCard: '110101198608258901', phone: '13800138013', position: '技师', department: '线路工区', hireDate: '2012-10-08', status: '在职', education: '中专', major: '铁道养护', politicalStatus: '群众', birthDate: '1986-08-25', nativePlace: '四川成都', emergencyContact: '何芳', emergencyPhone: '13900013333', address: '北京市平谷区兴谷开发区平谷大街88号' },
        { id: 14, name: '冯丽', gender: '女', idCard: '110101199109124512', phone: '13800138014', position: '出纳', department: '财务科', hireDate: '2016-06-01', status: '在职', education: '大专', major: '金融学', politicalStatus: '群众', birthDate: '1991-09-12', nativePlace: '广东广州', emergencyContact: '冯强', emergencyPhone: '13900014444', address: '北京市怀柔区雁栖开发区乐园南街88号' },
        { id: 15, name: '卫东', gender: '男', idCard: '110101198511037890', phone: '13800138015', position: '工程师', department: '维修工区', hireDate: '2010-11-18', status: '在职', education: '本科', major: '机械工程', politicalStatus: '党员', birthDate: '1985-11-03', nativePlace: '陕西西安', emergencyContact: '卫红', emergencyPhone: '13900015555', address: '北京市密云区新南路108号' },
        { id: 16, name: '蒋雪', gender: '女', idCard: '110101199306151234', phone: '13800138016', position: '安全员', department: '安全科', hireDate: '2018-09-05', status: '在职', education: '本科', major: '安全工程', politicalStatus: '团员', birthDate: '1993-06-15', nativePlace: '湖南长沙', emergencyContact: '蒋军', emergencyPhone: '13900016666', address: '北京市延庆区百泉街道湖南东路55号' },
        { id: 17, name: '韩峰', gender: '男', idCard: '110101198802205678', phone: '13800138017', position: '技师长', department: '线路工区', hireDate: '2013-04-12', status: '在职', education: '大专', major: '铁道工程', politicalStatus: '党员', birthDate: '1988-02-20', nativePlace: '江西南昌', emergencyContact: '韩敏', emergencyPhone: '13900017777', address: '北京市朝阳区望京SOHO T3' },
        { id: 18, name: '曹颖', gender: '女', idCard: '110101199208119012', phone: '13800138018', position: '人事专员', department: '人事科', hireDate: '2017-07-20', status: '在职', education: '本科', major: '人力资源管理', politicalStatus: '团员', birthDate: '1992-08-11', nativePlace: '辽宁沈阳', emergencyContact: '曹建', emergencyPhone: '13900018888', address: '北京市海淀区上地信息路28号' },
        { id: 19, name: '袁刚', gender: '男', idCard: '110101198905143456', phone: '13800138019', position: '技师', department: '检测工区', hireDate: '2014-12-01', status: '在职', education: '中专', major: '无损检测', politicalStatus: '群众', birthDate: '1989-05-14', nativePlace: '吉林长春', emergencyContact: '袁丽', emergencyPhone: '13900019999', address: '北京市丰台区科技园区广安路15号' },
        { id: 20, name: '邓芳', gender: '女', idCard: '110101199110226789', phone: '13800138020', position: '统计员', department: '办公室', hireDate: '2019-08-15', status: '在职', education: '本科', major: '统计学', politicalStatus: '群众', birthDate: '1991-10-22', nativePlace: '重庆', emergencyContact: '邓强', emergencyPhone: '13900020000', address: '北京市东城区建国门内大街18号' }
    ],
    roadSegments: [
        { id: 1, name: '京广线K100-K120', startMileage: 'K100+000', endMileage: 'K120+000', length: 20, roadType: '沥青路面', techLevel: '一级', maintainer: '张建国', maintainDate: '2026-03-01' },
        { id: 2, name: '京沪线K200-K220', startMileage: 'K200+000', endMileage: 'K220+000', length: 20, roadType: '混凝土路面', techLevel: '一级', maintainer: '李明华', maintainDate: '2026-03-05' },
        { id: 3, name: '京九线K300-K315', startMileage: 'K300+000', endMileage: 'K315+000', length: 15, roadType: '沥青路面', techLevel: '一级', maintainer: '王德胜', maintainDate: '2026-03-10' },
        { id: 4, name: '沪昆线K400-K425', startMileage: 'K400+000', endMileage: 'K425+000', length: 25, roadType: '混凝土路面', techLevel: '一级', maintainer: '陈勇', maintainDate: '2026-03-12' }
    ],
    bridges: [
        { id: 1001, name: '京广特大桥', location: 'K108+500', length: 2580, width: 13.2, type: '预应力混凝土连续梁桥', buildDate: '2010-06', maintainer: '张建国', status: '良好', lastInspection: '2026-03-15', loadCapacity: '120吨' },
        { id: 1002, name: '黄河大桥', location: 'K205+300', length: 1850, width: 12.8, type: '钢桁架桥', buildDate: '2008-09', maintainer: '李明华', status: '良好', lastInspection: '2026-03-10', loadCapacity: '100吨' },
        { id: 1003, name: '长江大桥', location: 'K310+800', length: 3200, width: 14.5, type: '斜拉桥', buildDate: '2012-12', maintainer: '王德胜', status: '优秀', lastInspection: '2026-03-18', loadCapacity: '150吨' },
        { id: 1004, name: '珠江大桥', location: 'K415+200', length: 1560, width: 13.0, type: '悬索桥', buildDate: '2015-05', maintainer: '刘芳', status: '良好', lastInspection: '2026-03-16', loadCapacity: '110吨' }
    ],
    culverts: [
        { id: 2001, name: '1号涵洞', location: 'K102+350', type: '圆管涵', diameter: 1.5, length: 25, material: '钢筋混凝土', buildDate: '2010-04', status: '良好', lastMaintenance: '2026-02-20' },
        { id: 2002, name: '2号涵洞', location: 'K115+680', type: '箱涵', width: 3.0, height: 2.5, length: 35, material: '钢筋混凝土', buildDate: '2011-06', status: '良好', lastMaintenance: '2026-03-05' },
        { id: 2003, name: '3号涵洞', location: 'K203+120', type: '盖板涵', width: 2.5, height: 2.0, length: 20, material: '预制混凝土', buildDate: '2009-08', status: '需维修', lastMaintenance: '2025-12-15' },
        { id: 2004, name: '4号涵洞', location: 'K308+450', type: '圆管涵', diameter: 2.0, length: 30, material: '钢筋混凝土', buildDate: '2013-07', status: '良好', lastMaintenance: '2026-03-08' },
        { id: 2005, name: '5号涵洞', location: 'K420+560', type: '箱涵', width: 4.0, height: 3.0, length: 40, material: '钢筋混凝土', buildDate: '2014-09', status: '优秀', lastMaintenance: '2026-03-12' }
    ],
    tunnels: [
        { id: 3001, name: '秦岭隧道', location: 'K125+000-K135+500', length: 10500, width: 12.5, height: 8.2, type: '双线铁路隧道', buildDate: '2009-10', lighting: 'LED照明', ventilation: '纵向通风', status: '良好', lastInspection: '2026-03-08' },
        { id: 3002, name: '太行山隧道', location: 'K218+200-K225+800', length: 7600, width: 11.8, height: 7.8, type: '单线铁路隧道', buildDate: '2011-12', lighting: '荧光灯', ventilation: '横向通风', status: '良好', lastInspection: '2026-03-14' },
        { id: 3003, name: '大别山隧道', location: 'K335+000-K340+200', length: 5200, width: 12.0, height: 8.0, type: '双线铁路隧道', buildDate: '2016-08', lighting: 'LED照明', ventilation: '纵向通风', status: '优秀', lastInspection: '2026-03-17' }
    ],
    equipment: [
        { id: 4001, name: '钢轨探伤仪', model: 'GTJ-A3', manufacturer: '北京铁科院', purchaseDate: '2020-05', quantity: 3, unit: '台', status: '正常', maintainer: '张建国', location: '检测工区', lastMaintenance: '2026-03-01', price: 85000 },
        { id: 4002, name: '道岔打磨机', model: 'DCM-500', manufacturer: '西安轨道装备', purchaseDate: '2019-08', quantity: 2, unit: '台', status: '正常', maintainer: '李明华', location: '维修工区', lastMaintenance: '2026-02-25', price: 125000 },
        { id: 4003, name: '液压起道机', model: 'QDJ-32', manufacturer: '郑州铁路机械', purchaseDate: '2021-03', quantity: 8, unit: '台', status: '正常', maintainer: '王德胜', location: '线路工区', lastMaintenance: '2026-03-10', price: 32000 },
        { id: 4004, name: '轨道检测车', model: 'GJC-2000', manufacturer: '株洲电力机车', purchaseDate: '2018-11', quantity: 1, unit: '辆', status: '正常', maintainer: '刘芳', location: '检测工区', lastMaintenance: '2026-03-15', price: 2800000 },
        { id: 4005, name: '电焊机', model: 'DHJ-400', manufacturer: '济南焊接设备', purchaseDate: '2020-02', quantity: 6, unit: '台', status: '正常', maintainer: '陈勇', location: '维修工区', lastMaintenance: '2026-03-08', price: 15000 }
    ],
    materials: [
        { id: 5001, name: '60kg/m钢轨', specs: '25m/根', unit: '根', quantity: 120, safetyStock: 50, warehouse: '1号库房', supplier: '鞍钢集团', unitPrice: 12500, totalValue: 1500000, lastUpdate: '2026-03-15' },
        { id: 5002, name: '混凝土轨枕', specs: 'Ⅲ型', unit: '根', quantity: 2800, safetyStock: 1000, warehouse: '2号料场', supplier: '石家庄水泥制品', unitPrice: 350, totalValue: 980000, lastUpdate: '2026-03-18' },
        { id: 5003, name: '道钉', specs: 'Φ22×160mm', unit: '吨', quantity: 8.5, safetyStock: 3.0, warehouse: '小件库', supplier: '唐山钢铁', unitPrice: 6800, totalValue: 57800, lastUpdate: '2026-03-10' },
        { id: 5004, name: '扣件', specs: 'WJ-8型', unit: '套', quantity: 5000, safetyStock: 2000, warehouse: '1号库房', supplier: '北京铁路配件', unitPrice: 85, totalValue: 425000, lastUpdate: '2026-03-12' },
        { id: 5005, name: '道砟', specs: '特级', unit: '立方米', quantity: 1500, safetyStock: 500, warehouse: '料场', supplier: '河北石料', unitPrice: 120, totalValue: 180000, lastUpdate: '2026-03-16' },
        { id: 5006, name: '螺栓', specs: 'M24×120', unit: '千克', quantity: 850, safetyStock: 300, warehouse: '小件库', supplier: '天津紧固件', unitPrice: 35, totalValue: 29750, lastUpdate: '2026-03-14' }
    ],
    workOrders: [
        { id: 6001, orderNo: 'PG20260315001', taskName: '京广线路基检修', location: 'K105+200-K105+800', assignee: '张建国', team: '检测工区', startDate: '2026-03-16', endDate: '2026-03-18', status: '进行中', priority: '高', description: '路基沉降修复' },
        { id: 6002, orderNo: 'PG20260316001', taskName: '黄河大桥定期检测', location: 'K205+300', assignee: '李明华', team: '维修工区', startDate: '2026-03-17', endDate: '2026-03-19', status: '待开始', priority: '中', description: '桥梁结构安全检测' },
        { id: 6003, orderNo: 'PG20260318001', taskName: '秦岭隧道照明更换', location: 'K125+000-K135+500', assignee: '王德胜', team: '线路工区', startDate: '2026-03-20', endDate: '2026-03-22', status: '待开始', priority: '中', description: '更换老化照明设备' },
        { id: 6004, orderNo: 'PG20260312001', taskName: '3号涵洞维修', location: 'K203+120', assignee: '陈勇', team: '维修工区', startDate: '2026-03-12', endDate: '2026-03-14', status: '已完成', priority: '高', description: '涵洞底部裂缝修复' }
    ],
    tempWorkers: [
        { id: 7001, name: '赵强', gender: '男', idCard: '110101199512145678', phone: '13900139001', workType: '线路维修', hireDate: '2026-01-10', endDate: '2026-06-30', dailyWage: 280, team: '线路工区', status: '在岗' },
        { id: 7002, name: '孙丽', gender: '女', idCard: '110101199803256789', phone: '13900139002', workType: '清洁保养', hireDate: '2026-02-01', endDate: '2026-07-31', dailyWage: 200, team: '检测工区', status: '在岗' },
        { id: 7003, name: '周杰', gender: '男', idCard: '110101199605178912', phone: '13900139003', workType: '辅助施工', hireDate: '2026-03-01', endDate: '2026-08-31', dailyWage: 260, team: '维修工区', status: '在岗' }
    ],
    attendance: [
        { id: 8001, employeeName: '张建国', date: '2026-03-15', checkIn: '08:00', checkOut: '17:30', workHours: 9.5, overtime: 0.5, status: '正常', location: '检测工区' },
        { id: 8002, employeeName: '李明华', date: '2026-03-15', checkIn: '08:05', checkOut: '17:25', workHours: 9.3, overtime: 0, status: '正常', location: '维修工区' },
        { id: 8003, employeeName: '王德胜', date: '2026-03-15', checkIn: '07:55', checkOut: '18:00', workHours: 10, overtime: 1, status: '正常', location: '线路工区' },
        { id: 8004, employeeName: '刘芳', date: '2026-03-15', checkIn: '08:10', checkOut: '17:20', workHours: 9.2, overtime: 0, status: '迟到', location: '检测工区' },
        { id: 8005, employeeName: '陈勇', date: '2026-03-15', checkIn: '08:00', checkOut: '17:30', workHours: 9.5, overtime: 0.5, status: '正常', location: '维修工区' }
    ],
    equipmentUsage: [
        { id: 9001, equipmentName: '钢轨探伤仪', operator: '张建国', usageDate: '2026-03-15', startTime: '09:00', endTime: '16:00', location: 'K105+200', purpose: '钢轨探伤检测', status: '正常', remarks: '设备运行良好' },
        { id: 9002, equipmentName: '道岔打磨机', operator: '李明华', usageDate: '2026-03-16', startTime: '10:00', endTime: '15:30', location: 'K208+500', purpose: '道岔打磨', status: '正常', remarks: '完成打磨作业' },
        { id: 9003, equipmentName: '液压起道机', operator: '王德胜', usageDate: '2026-03-17', startTime: '08:30', endTime: '12:00', location: 'K312+800', purpose: '路基起道', status: '正常', remarks: '作业顺利' }
    ],
    materialUsage: [
        { id: 10001, materialName: '60kg/m钢轨', usageDate: '2026-03-14', quantity: 8, unit: '根', purpose: '线路更换', location: 'K105+500', operator: '张建国', approver: '李明华', totalValue: 100000, remarks: '更换老化钢轨' },
        { id: 10002, materialName: '混凝土轨枕', usageDate: '2026-03-15', quantity: 120, unit: '根', purpose: '轨枕更换', location: 'K208+300', operator: '陈勇', approver: '张建国', totalValue: 42000, remarks: '例行维护' },
        { id: 10003, materialName: '道钉', usageDate: '2026-03-16', quantity: 0.5, unit: '吨', purpose: '线路加固', location: 'K315+100', operator: '王德胜', approver: '李明华', totalValue: 3400, remarks: '加固作业' }
    ],
    techSurvey: [
        { id: 11001, surveyDate: '2026-03-10', location: 'K105+000-K110+000', surveyType: '路基状况', surveyor: '张建国', findings: '部分区段路基沉降', level: '中等', nextSurvey: '2026-06-10', status: '已处理' },
        { id: 11002, surveyDate: '2026-03-12', location: 'K205+300', surveyType: '桥梁检测', surveyor: '李明华', findings: '桥面轻微裂缝', level: '轻微', nextSurvey: '2026-09-12', status: '待处理' },
        { id: 11003, surveyDate: '2026-03-15', location: 'K125+000-K135+500', surveyType: '隧道检测', surveyor: '王德胜', findings: '照明设备老化', level: '中等', nextSurvey: '2026-06-15', status: '处理中' }
    ],
    techDetails: [
        { id: 12001, itemType: '钢轨', location: 'K105+200', model: '60kg/m', installDate: '2015-06-10', condition: '良好', wearLevel: '轻度', lastCheck: '2026-03-15', nextCheck: '2026-06-15', remarks: '正常使用' },
        { id: 12002, itemType: '轨枕', location: 'K208+500', model: 'Ⅲ型混凝土', installDate: '2016-08-20', condition: '良好', wearLevel: '轻度', lastCheck: '2026-03-14', nextCheck: '2026-06-14', remarks: '状况良好' },
        { id: 12003, itemType: '道岔', location: 'K312+800', model: '9号单开', installDate: '2018-04-15', condition: '需维护', wearLevel: '中度', lastCheck: '2026-03-16', nextCheck: '2026-04-16', remarks: '需要打磨' },
        { id: 12004, itemType: '扣件', location: 'K420+300', model: 'WJ-8型', installDate: '2019-09-25', condition: '良好', wearLevel: '轻度', lastCheck: '2026-03-18', nextCheck: '2026-06-18', remarks: '紧固良好' }
    ]
};

// 生成唯一ID
function generateId(dataKey) {
    if (database[dataKey].length === 0) {
        if (dataKey === 'bridges') return 1001;
        if (dataKey === 'culverts') return 2001;
        if (dataKey === 'tunnels') return 3001;
        if (dataKey === 'equipment') return 4001;
        if (dataKey === 'materials') return 5001;
        if (dataKey === 'workOrders') return 6001;
        if (dataKey === 'tempWorkers') return 7001;
        if (dataKey === 'attendance') return 8001;
        if (dataKey === 'equipmentUsage') return 9001;
        if (dataKey === 'materialUsage') return 10001;
        if (dataKey === 'techSurvey') return 11001;
        if (dataKey === 'techDetails') return 12001;
        return 1;
    }
    const maxId = Math.max.apply(null, database[dataKey].map(function(item) { return item.id; }));
    return maxId + 1;
}

// ==================== 工具函数 ====================
function generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}

function drawCaptcha() {
    const canvas = document.getElementById('captchaCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, width, height);

    captchaText = generateCaptcha();
    ctx.font = 'bold 24px Arial';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < captchaText.length; i++) {
        ctx.save();
        ctx.fillStyle = 'rgb(' + Math.random() * 100 + ',' + Math.random() * 100 + ',' + Math.random() * 100 + ')';
        const x = 20 + i * 20;
        const y = height / 2;
        const angle = (Math.random() - 0.5) * 0.4;
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillText(captchaText[i], 0, 0);
        ctx.restore();
    }
}

function showMessage(message, type) {
    type = type || 'info';
    const colors = { success: '#27ae60', error: '#e74c3c', info: '#3498db', warning: '#f39c12' };
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: ' + (colors[type] || colors.info) + '; color: white; padding: 15px 25px; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); z-index: 10000; animation: slideInRight 0.3s ease-out;';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(function() {
        messageDiv.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(function() {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

function formatDate(date) {
    const d = new Date(date);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function getTodayDate() {
    return formatDate(new Date());
}

// ==================== 登录功能 ====================
function initLogin() {
    const loginForm = document.getElementById('loginForm');
    const captchaCanvas = document.getElementById('captchaCanvas');

    drawCaptcha();
    captchaCanvas.addEventListener('click', drawCaptcha);

    document.getElementById('guestBtn').addEventListener('click', function() {
        currentUser = { username: 'guest', name: '游客', isGuest: true };
        showMessage('以游客模式登录', 'info');
        setTimeout(function() {
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('mainPage').style.display = 'block';
            document.getElementById('currentUser').textContent = '游客';
            initMainPage();
        }, 500);
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const captcha = document.getElementById('captcha').value.trim().toUpperCase();

        // 允许空登录或验证登录
        if (!username && !password && !captcha) {
            // 空登录，直接以游客身份进入
            currentUser = { username: 'guest', name: '访客用户', isGuest: true };
            showMessage('直接登录成功！', 'success');
            setTimeout(function() {
                document.getElementById('loginPage').style.display = 'none';
                document.getElementById('mainPage').style.display = 'block';
                document.getElementById('currentUser').textContent = '访客用户';
                initMainPage();
            }, 500);
            return;
        }

        // 如果输入了用户名或密码，进行正常验证
        if (username || password) {
            if (captcha && captcha !== captchaText) {
                showMessage('验证码错误', 'error');
                drawCaptcha();
                document.getElementById('captcha').value = '';
                return;
            }

            const user = database.users.find(function(u) { return u.username === username && u.password === password; });
            if (user) {
                currentUser = user;
                showMessage('登录成功！', 'success');
                setTimeout(function() {
                    document.getElementById('loginPage').style.display = 'none';
                    document.getElementById('mainPage').style.display = 'block';
                    document.getElementById('currentUser').textContent = user.name;
                    initMainPage();
                }, 500);
            } else {
                showMessage('用户名或密码错误', 'error');
                drawCaptcha();
                document.getElementById('captcha').value = '';
            }
        } else {
            // 只输入了验证码，按空登录处理
            currentUser = { username: 'guest', name: '访客用户', isGuest: true };
            showMessage('直接登录成功！', 'success');
            setTimeout(function() {
                document.getElementById('loginPage').style.display = 'none';
                document.getElementById('mainPage').style.display = 'block';
                document.getElementById('currentUser').textContent = '访客用户';
                initMainPage();
            }, 500);
        }
    });
}

// ==================== 主界面功能 ====================
function initMainPage() {
    initNavigation();
    document.getElementById('logoutBtn').addEventListener('click', logout);
    initToolbar();
    showPage('employee-info');
}

function initNavigation() {
    const menuItems = document.querySelectorAll('.submenu li');
    menuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            menuItems.forEach(function(i) { i.classList.remove('active'); });
            item.classList.add('active');
            const pages = document.querySelectorAll('.page-content');
            pages.forEach(function(page) { page.style.display = 'none'; });
            showPage(item.getAttribute('data-page'));
        });
    });
}

function showPage(pageId) {
    const pageMapping = {
        'employee-info': { page: 'employeeInfoPage', data: 'employees', table: 'employeeTable', render: renderEmployeeRow },
        'road-segment': { page: 'roadSegmentPage', data: 'roadSegments', table: 'roadSegmentTable', render: renderRoadSegmentRow },
        'bridge-info': { page: 'bridgeInfoPage', data: 'bridges', table: 'bridgeTable', render: renderBridgeRow },
        'culvert-info': { page: 'culvertInfoPage', data: 'culverts', table: 'culvertTable', render: renderCulvertRow },
        'tunnel-info': { page: 'tunnelInfoPage', data: 'tunnels', table: 'tunnelTable', render: renderTunnelRow },
        'equipment': { page: 'equipmentPage', data: 'equipment', table: 'equipmentTable', render: renderEquipmentRow },
        'materials': { page: 'materialsPage', data: 'materials', table: 'materialTable', render: renderMaterialRow },
        'work-order': { page: 'workOrderPage', data: 'workOrders', table: 'workOrderTable', render: renderWorkOrderRow },
        'temp-worker': { page: 'tempWorkerPage', data: 'tempWorkers', table: 'tempWorkerTable', render: renderTempWorkerRow },
        'attendance': { page: 'attendancePage', data: 'attendance', table: 'attendanceTable', render: renderAttendanceRow },
        'equipment-usage': { page: 'equipmentUsagePage', data: 'equipmentUsage', table: 'equipmentUsageTable', render: renderEquipmentUsageRow },
        'material-usage': { page: 'materialUsagePage', data: 'materialUsage', table: 'materialUsageTable', render: renderMaterialUsageRow },
        'tech-survey': { page: 'techSurveyPage', data: 'techSurvey', table: 'techSurveyTable', render: renderTechSurveyRow },
        'tech-details': { page: 'techDetailsPage', data: 'techDetails', table: 'techDetailsTable', render: renderTechDetailsRow }
    };

    const mapping = pageMapping[pageId];
    if (mapping) {
        document.getElementById(mapping.page).style.display = 'block';
        loadTableData(mapping.data, mapping.table, mapping.render);
    }
}

function loadTableData(dataKey, tableId, renderFunc) {
    const tbody = document.querySelector('#' + tableId + ' tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    database[dataKey].forEach(function(item) {
        tbody.appendChild(renderFunc(item));
    });
}

// ==================== 表格渲染函数 ====================
function renderEmployeeRow(item) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>' + item.id + '</td><td>' + item.name + '</td><td>' + item.gender + '</td><td>' + item.idCard + '</td><td>' + item.phone + '</td><td>' + item.position + '</td><td>' + item.department + '</td><td>' + item.hireDate + '</td><td>' + item.status + '</td><td><button class="btn-edit" onclick="editItem(' + item.id + ', \'employees\')">修改</button><button class="btn-delete" onclick="deleteItem(' + item.id + ', \'employees\')">删除</button></td>';
    return tr;
}

function renderRoadSegmentRow(item) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>' + item.id + '</td><td>' + item.name + '</td><td>' + item.startMileage + '</td><td>' + item.endMileage + '</td><td>' + item.length + '</td><td>' + item.roadType + '</td><td>' + item.techLevel + '</td><td>' + item.maintainer + '</td><td>' + item.maintainDate + '</td><td><button class="btn-edit" onclick="editItem(' + item.id + ', \'roadSegments\')">修改</button><button class="btn-delete" onclick="deleteItem(' + item.id + ', \'roadSegments\')">删除</button></td>';
    return tr;
}

function renderBridgeRow(item) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>' + item.id + '</td><td>' + item.name + '</td><td>' + item.location + '</td><td>' + item.length + '</td><td>' + item.width + '</td><td>' + item.type + '</td><td>' + item.buildDate + '</td><td>' + item.maintainer + '</td><td>' + item.status + '</td><td>' + item.lastInspection + '</td><td><button class="btn-edit" onclick="editItem(' + item.id + ', \'bridges\')">修改</button><button class="btn-delete" onclick="deleteItem(' + item.id + ', \'bridges\')">删除</button></td>';
    return tr;
}

function renderCulvertRow(item) {
    const tr = document.createElement('tr');
    const sizeInfo = item.diameter ? item.diameter + 'm' : (item.width + '×' + item.height + 'm');
    tr.innerHTML = '<td>' + item.id + '</td><td>' + item.name + '</td><td>' + item.location + '</td><td>' + item.type + '</td><td>' + sizeInfo + '</td><td>' + item.length + '</td><td>' + item.material + '</td><td>' + item.buildDate + '</td><td>' + item.status + '</td><td>' + item.lastMaintenance + '</td><td><button class="btn-edit" onclick="editItem(' + item.id + ', \'culverts\')">修改</button><button class="btn-delete" onclick="deleteItem(' + item.id + ', \'culverts\')">删除</button></td>';
    return tr;
}

function renderTunnelRow(item) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>' + item.id + '</td><td>' + item.name + '</td><td>' + item.location + '</td><td>' + item.length + '</td><td>' + item.width + '×' + item.height + '</td><td>' + item.type + '</td><td>' + item.buildDate + '</td><td>' + item.lighting + '</td><td>' + item.ventilation + '</td><td>' + item.status + '</td><td>' + item.lastInspection + '</td><td><button class="btn-edit" onclick="editItem(' + item.id + ', \'tunnels\')">修改</button><button class="btn-delete" onclick="deleteItem(' + item.id + ', \'tunnels\')">删除</button></td>';
    return tr;
}

function renderEquipmentRow(item) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>' + item.id + '</td><td>' + item.name + '</td><td>' + item.model + '</td><td>' + item.manufacturer + '</td><td>' + item.purchaseDate + '</td><td>' + item.quantity + '</td><td>' + item.unit + '</td><td>' + item.status + '</td><td>' + item.maintainer + '</td><td>' + item.location + '</td><td>' + item.lastMaintenance + '</td><td><button class="btn-edit" onclick="editItem(' + item.id + ', \'equipment\')">修改</button><button class="btn-delete" onclick="deleteItem(' + item.id + ', \'equipment\')">删除</button></td>';
    return tr;
}

function renderMaterialRow(item) {
    const tr = document.createElement('tr');
    const stockClass = item.quantity <= item.safetyStock ? 'low-stock' : '';
    tr.innerHTML = '<td>' + item.id + '</td><td>' + item.name + '</td><td>' + item.specs + '</td><td>' + item.unit + '</td><td class="' + stockClass + '">' + item.quantity + '</td><td>' + item.safetyStock + '</td><td>' + item.warehouse + '</td><td>' + item.supplier + '</td><td>¥' + item.unitPrice + '</td><td>¥' + item.totalValue.toLocaleString() + '</td><td>' + item.lastUpdate + '</td><td><button class="btn-edit" onclick="editItem(' + item.id + ', \'materials\')">修改</button><button class="btn-delete" onclick="deleteItem(' + item.id + ', \'materials\')">删除</button></td>';
    return tr;
}

function renderWorkOrderRow(item) {
    const tr = document.createElement('tr');
    const statusClass = item.status === '已完成' ? 'status-completed' : (item.status === '进行中' ? 'status-in-progress' : 'status-pending');
    const priorityClass = item.priority === '高' ? 'priority-high' : (item.priority === '中' ? 'priority-medium' : 'priority-low');
    tr.innerHTML = '<td>' + item.id + '</td><td>' + item.orderNo + '</td><td>' + item.taskName + '</td><td>' + item.location + '</td><td>' + item.assignee + '</td><td>' + item.team + '</td><td>' + item.startDate + '</td><td>' + item.endDate + '</td><td><span class="' + statusClass + '">' + item.status + '</span></td><td><span class="' + priorityClass + '">' + item.priority + '</span></td><td><button class="btn-edit" onclick="editItem(' + item.id + ', \'workOrders\')">修改</button><button class="btn-delete" onclick="deleteItem(' + item.id + ', \'workOrders\')">删除</button></td>';
    return tr;
}

function renderTempWorkerRow(item) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>' + item.id + '</td><td>' + item.name + '</td><td>' + item.gender + '</td><td>' + item.idCard + '</td><td>' + item.phone + '</td><td>' + item.workType + '</td><td>' + item.hireDate + '</td><td>' + item.endDate + '</td><td>¥' + item.dailyWage + '</td><td>' + item.team + '</td><td>' + item.status + '</td><td><button class="btn-edit" onclick="editItem(' + item.id + ', \'tempWorkers\')">修改</button><button class="btn-delete" onclick="deleteItem(' + item.id + ', \'tempWorkers\')">删除</button></td>';
    return tr;
}

function renderAttendanceRow(item) {
    const tr = document.createElement('tr');
    const statusClass = item.status === '正常' ? 'status-normal' : (item.status === '迟到' ? 'status-late' : 'status-absent');
    tr.innerHTML = '<td>' + item.id + '</td><td>' + item.employeeName + '</td><td>' + item.date + '</td><td>' + item.checkIn + '</td><td>' + item.checkOut + '</td><td>' + item.workHours + '</td><td>' + item.overtime + '</td><td><span class="' + statusClass + '">' + item.status + '</span></td><td>' + item.location + '</td><td><button class="btn-edit" onclick="editItem(' + item.id + ', \'attendance\')">修改</button><button class="btn-delete" onclick="deleteItem(' + item.id + ', \'attendance\')">删除</button></td>';
    return tr;
}

function renderEquipmentUsageRow(item) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>' + item.id + '</td><td>' + item.equipmentName + '</td><td>' + item.operator + '</td><td>' + item.usageDate + '</td><td>' + item.startTime + '</td><td>' + item.endTime + '</td><td>' + item.location + '</td><td>' + item.purpose + '</td><td>' + item.status + '</td><td>' + item.remarks + '</td><td><button class="btn-edit" onclick="editItem(' + item.id + ', \'equipmentUsage\')">修改</button><button class="btn-delete" onclick="deleteItem(' + item.id + ', \'equipmentUsage\')">删除</button></td>';
    return tr;
}

function renderMaterialUsageRow(item) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>' + item.id + '</td><td>' + item.materialName + '</td><td>' + item.usageDate + '</td><td>' + item.quantity + '</td><td>' + item.unit + '</td><td>' + item.purpose + '</td><td>' + item.location + '</td><td>' + item.operator + '</td><td>' + item.approver + '</td><td>¥' + item.totalValue.toLocaleString() + '</td><td>' + item.remarks + '</td><td><button class="btn-edit" onclick="editItem(' + item.id + ', \'materialUsage\')">修改</button><button class="btn-delete" onclick="deleteItem(' + item.id + ', \'materialUsage\')">删除</button></td>';
    return tr;
}

function renderTechSurveyRow(item) {
    const tr = document.createElement('tr');
    const levelClass = item.level === '严重' ? 'level-serious' : (item.level === '中等' ? 'level-medium' : 'level-minor');
    tr.innerHTML = '<td>' + item.id + '</td><td>' + item.surveyDate + '</td><td>' + item.location + '</td><td>' + item.surveyType + '</td><td>' + item.surveyor + '</td><td>' + item.findings + '</td><td><span class="' + levelClass + '">' + item.level + '</span></td><td>' + item.nextSurvey + '</td><td>' + item.status + '</td><td><button class="btn-edit" onclick="editItem(' + item.id + ', \'techSurvey\')">修改</button><button class="btn-delete" onclick="deleteItem(' + item.id + ', \'techSurvey\')">删除</button></td>';
    return tr;
}

function renderTechDetailsRow(item) {
    const tr = document.createElement('tr');
    const conditionClass = item.condition === '需维护' ? 'condition-needs-maintenance' : 'condition-good';
    tr.innerHTML = '<td>' + item.id + '</td><td>' + item.itemType + '</td><td>' + item.location + '</td><td>' + item.model + '</td><td>' + item.installDate + '</td><td><span class="' + conditionClass + '">' + item.condition + '</span></td><td>' + item.wearLevel + '</td><td>' + item.lastCheck + '</td><td>' + item.nextCheck + '</td><td>' + item.remarks + '</td><td><button class="btn-edit" onclick="editItem(' + item.id + ', \'techDetails\')">修改</button><button class="btn-delete" onclick="deleteItem(' + item.id + ', \'techDetails\')">删除</button></td>';
    return tr;
}

// ==================== 工具栏功能 ====================
function initToolbar() {
    const toolbarBtns = document.querySelectorAll('.toolbar button');
    toolbarBtns.forEach(function(btn) {
        if (btn.id === 'addBtn') {
            btn.addEventListener('click', function() { openModal('add'); });
        } else if (btn.id === 'exportBtn') {
            btn.addEventListener('click', exportData);
        } else if (btn.id === 'printBtn') {
            btn.addEventListener('click', function() { window.print(); });
        }
    });
}

function openModal(mode, item, type) {
    currentEditItem = item || null;
    currentEditType = type || getCurrentDataType();
    const modal = document.getElementById('dataModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    if (mode === 'add') {
        modalTitle.textContent = '新建记录';
        modalBody.innerHTML = generateForm(currentEditType, null);
    } else if (mode === 'edit') {
        modalTitle.textContent = '修改记录';
        modalBody.innerHTML = generateForm(currentEditType, item);
    }

    modal.style.display = 'flex';
    
    document.getElementById('modalSaveBtn').onclick = function() { saveModalData(mode); };
    document.getElementById('modalCloseBtn').onclick = closeModal;
}

function closeModal() {
    document.getElementById('dataModal').style.display = 'none';
    currentEditItem = null;
    currentEditType = null;
}

function getCurrentDataType() {
    const activeMenu = document.querySelector('.submenu li.active');
    if (!activeMenu) return 'employees';
    const pageId = activeMenu.getAttribute('data-page');
    const mapping = {
        'employee-info': 'employees',
        'road-segment': 'roadSegments',
        'bridge-info': 'bridges',
        'culvert-info': 'culverts',
        'tunnel-info': 'tunnels',
        'equipment': 'equipment',
        'materials': 'materials',
        'work-order': 'workOrders',
        'temp-worker': 'tempWorkers',
        'attendance': 'attendance',
        'equipment-usage': 'equipmentUsage',
        'material-usage': 'materialUsage',
        'tech-survey': 'techSurvey',
        'tech-details': 'techDetails'
    };
    return mapping[pageId] || 'employees';
}

function generateForm(dataType, item) {
    const forms = {
        employees: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;"><label>姓名：<input type="text" id="name" value="' + (item ? item.name : '') + '" required></label><label>性别：<select id="gender"><option value="男"' + (item && item.gender === '男' ? ' selected' : '') + '>男</option><option value="女"' + (item && item.gender === '女' ? ' selected' : '') + '>女</option></select></label><label>身份证号：<input type="text" id="idCard" value="' + (item ? item.idCard : '') + '" required></label><label>电话：<input type="tel" id="phone" value="' + (item ? item.phone : '') + '" required></label><label>职位：<input type="text" id="position" value="' + (item ? item.position : '') + '" required></label><label>部门：<input type="text" id="department" value="' + (item ? item.department : '') + '" required></label><label>学历：<select id="education"><option value="博士"' + (item && item.education === '博士' ? ' selected' : '') + '>博士</option><option value="硕士"' + (item && item.education === '硕士' ? ' selected' : '') + '>硕士</option><option value="本科"' + (item && item.education === '本科' ? ' selected' : '') + '>本科</option><option value="大专"' + (item && item.education === '大专' ? ' selected' : '') + '>大专</option><option value="中专"' + (item && item.education === '中专' ? ' selected' : '') + '>中专</option></select></label><label>专业：<input type="text" id="major" value="' + (item ? item.major : '') + '"></label><label>政治面貌：<select id="politicalStatus"><option value="党员"' + (item && item.politicalStatus === '党员' ? ' selected' : '') + '>党员</option><option value="团员"' + (item && item.politicalStatus === '团员' ? ' selected' : '') + '>团员</option><option value="群众"' + (item && item.politicalStatus === '群众' ? ' selected' : '') + '>群众</option></select></label><label>出生日期：<input type="date" id="birthDate" value="' + (item ? item.birthDate : '') + '"></label><label>籍贯：<input type="text" id="nativePlace" value="' + (item ? item.nativePlace : '') + '"></label><label>紧急联系人：<input type="text" id="emergencyContact" value="' + (item ? item.emergencyContact : '') + '"></label><label>紧急联系电话：<input type="tel" id="emergencyPhone" value="' + (item ? item.emergencyPhone : '') + '"></label><label>入职日期：<input type="date" id="hireDate" value="' + (item ? item.hireDate : getTodayDate()) + '" required></label><label>状态：<select id="status"><option value="在职"' + (item && item.status === '在职' ? ' selected' : '') + '>在职</option><option value="离职"' + (item && item.status === '离职' ? ' selected' : '') + '>离职</option></select></label></div><label style="grid-column:1/-1;">家庭住址：<input type="text" id="address" value="' + (item ? item.address : '') + '" style="width:100%;"></label>',
        roadSegments: '<label>路段名称：<input type="text" id="name" value="' + (item ? item.name : '') + '" required></label><label>起始桩号：<input type="text" id="startMileage" value="' + (item ? item.startMileage : '') + '" required></label><label>终止桩号：<input type="text" id="endMileage" value="' + (item ? item.endMileage : '') + '" required></label><label>长度(km)：<input type="number" id="length" value="' + (item ? item.length : '') + '" step="0.1" required></label><label>路面类型：<input type="text" id="roadType" value="' + (item ? item.roadType : '') + '" required></label><label>技术等级：<select id="techLevel"><option value="一级"' + (item && item.techLevel === '一级' ? ' selected' : '') + '>一级</option><option value="二级"' + (item && item.techLevel === '二级' ? ' selected' : '') + '>二级</option></select></label><label>维护责任人：<input type="text" id="maintainer" value="' + (item ? item.maintainer : '') + '" required></label><label>维护日期：<input type="date" id="maintainDate" value="' + (item ? item.maintainDate : getTodayDate()) + '" required></label>',
        bridges: '<label>桥梁名称：<input type="text" id="name" value="' + (item ? item.name : '') + '" required></label><label>位置：<input type="text" id="location" value="' + (item ? item.location : '') + '" required></label><label>长度(m)：<input type="number" id="length" value="' + (item ? item.length : '') + '" required></label><label>宽度(m)：<input type="number" id="width" value="' + (item ? item.width : '') + '" step="0.1" required></label><label>桥梁类型：<input type="text" id="type" value="' + (item ? item.type : '') + '" required></label><label>建设日期：<input type="month" id="buildDate" value="' + (item ? item.buildDate : '') + '" required></label><label>维护人：<input type="text" id="maintainer" value="' + (item ? item.maintainer : '') + '" required></label><label>状态：<select id="status"><option value="优秀"' + (item && item.status === '优秀' ? ' selected' : '') + '>优秀</option><option value="良好"' + (item && item.status === '良好' ? ' selected' : '') + '>良好</option><option value="需维修"' + (item && item.status === '需维修' ? ' selected' : '') + '>需维修</option></select></label><label>最后检测：<input type="date" id="lastInspection" value="' + (item ? item.lastInspection : getTodayDate()) + '" required></label><label>承载能力：<input type="text" id="loadCapacity" value="' + (item ? item.loadCapacity : '') + '" required></label>'
    };
    return forms[dataType] || '<p>暂无表单配置</p>';
}

function saveModalData(mode) {
    const formData = {};
    const inputs = document.querySelectorAll('#modalBody input, #modalBody select');
    inputs.forEach(function(input) {
        formData[input.id] = input.value;
    });

    if (mode === 'add') {
        formData.id = generateId(currentEditType);
        database[currentEditType].push(formData);
        showMessage('新建成功', 'success');
    } else if (mode === 'edit' && currentEditItem) {
        const index = database[currentEditType].findIndex(function(item) { return item.id === currentEditItem.id; });
        if (index !== -1) {
            formData.id = currentEditItem.id;
            database[currentEditType][index] = formData;
            showMessage('修改成功', 'success');
        }
    }

    closeModal();
    const activeMenu = document.querySelector('.submenu li.active');
    if (activeMenu) {
        showPage(activeMenu.getAttribute('data-page'));
    }
}

function editItem(id, dataType) {
    const item = database[dataType].find(function(i) { return i.id === id; });
    if (item) {
        openModal('edit', item, dataType);
    }
}

function deleteItem(id, dataType) {
    if (confirm('确定要删除此记录吗？')) {
        const index = database[dataType].findIndex(function(item) { return item.id === id; });
        if (index !== -1) {
            database[dataType].splice(index, 1);
            showMessage('删除成功', 'success');
            const activeMenu = document.querySelector('.submenu li.active');
            if (activeMenu) {
                showPage(activeMenu.getAttribute('data-page'));
            }
        }
    }
}

function exportData() {
    const currentData = database[getCurrentDataType()];
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', getCurrentDataType() + '_' + new Date().getTime() + '.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showMessage('数据导出成功', 'success');
}

function logout() {
    if (confirm('确定要退出登录吗？')) {
        currentUser = null;
        document.getElementById('mainPage').style.display = 'none';
        document.getElementById('loginPage').style.display = 'flex';
        document.getElementById('loginForm').reset();
        document.getElementById('captcha').value = '';
        drawCaptcha();
        showMessage('已退出登录', 'info');
    }
}

// ==================== 页面初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    initLogin();
});
