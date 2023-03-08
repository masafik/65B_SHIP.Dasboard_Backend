const schema = ({

    "/api/webhook/scaffolding": {
        "post": {
            "x-swagger-router-controller": "webhook/scaffolding",
            "tags": [
                "WEBHOOK"
            ],
            "description": "สำหรับรับข้อมูลนั่งร้านที่ติดตั้งในพื้นที่จาก Scaffolding Management",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "array",

                        "items": {
                            "type": "object",

                            "required": [
                                "ScaffoldingCode",
                                "OwnerType",
                                "WorkName",
                                "PersonalID",
                                // "WorkPermitNo",
                                "ScaffoldingTypeID",
                                "ScaffoldingType",
                                "Title",
                                "Area",
                                "AreaName",
                                "SubAreaID",
                                "Features",
                                // "FeaturesPropertiesCentroid_X",
                                // "FeaturesPropertiesCentroid_Y",
                                "WorkingStartDate",
                                "WorkingEndDate",
                                "VendorCode",
                                "VendorName",
                                "PTTStaffCode",
                                "PTTStaff",
                                "AgencyID",
                                "AgencyName",
                                // "Owner",
                                // "OwnerName",
                                // "WorkpermitType",
                                "StatusID",
                                "StatusName"
                            ],
                            "properties": {
                                "SAPWorkOrderNo": {
                                    "type": "string",
                                    "maxLength": 15,
                                    "description": "SAP Maintenance No"
                                },
                                "ScaffoldingCode": {
                                    "type": "string",
                                    "maxLength": 50,
                                    "description": "เลขที่นั่งร้าน",
                                    "default": "Y/GSP#1/บง.วบก./LD/2021/00001"
                                },
                                "OwnerType": {
                                    "type": "string",
                                    "maxLength": 1,
                                    "description": "ประเภทผู้ขอรายการ",
                                    "default": "พนกังานปตท"
                                },
                                "WorkOwnerID": {
                                    "type": "string",
                                    "maxLength": 10,
                                    "description": "รหัสผู้ขอรายการ"
                                },
                                "WorkName": {
                                    "type": "string",
                                    "maxLength": 120,
                                    "description": "ชื่อ-นามสกุล",
                                    "default": "สมชาย กล้าหาญ"
                                },
                                "PersonalID": {
                                    "type": "string",
                                    "maxLength": 13,
                                    "description": "เลขบบัตรประชาชน",
                                    "default": "1234567890123"
                                },
                                "WorkPermitNo": {
                                    "type": "string",
                                    "maxLength": 30,
                                    "description": "เลข Work Permit",
                                    "default": "NMOD-02119"
                                },
                                "ScaffoldingTypeID": {
                                    "type": "string",
                                    "maxLength": 4,
                                    "description": "รหัสประเภทของนั่งร้าน"
                                },
                                "ScaffoldingType": {
                                    "type": "string",
                                    "maxLength": 30,
                                    "description": "ประเภทของนั่งร้าน",
                                    "default": "นั่งร้านแบบเคลื่อนที่ได้"
                                },
                                "ScaffoldingSubTypeID": {
                                    "type": "string",
                                    "description": "รหัสประเภทย่อยของนั่งร้าน"
                                },
                                "ScaffoldingSubType": {
                                    "type": "string",
                                    "description": "ประเภทย่อยของนั่งร้าน"
                                },
                                "Title": {
                                    "type": "string",
                                    "maxLength": 500,
                                    "description": "ชื่องาน",
                                    "default": "ติดตั้งนั่งร้าน"
                                },
                                "description": {
                                    "type": "string",
                                    "maxLength": 500,
                                    "description": "รายละเอียดงาน",
                                    "default": "ติดตั้งนั่งร้านแบบเคลื่อนที่ได้"
                                },
                                "Objective": {
                                    "type": "string",
                                    "maxLength": 1000,
                                    "description": "วัตถุประสงค์",
                                    "default": "ติดตั้งนั่งร้านแบบเคลื่อนที่ได้"
                                },
                                "RemoveDate": {
                                    "type": "string",
                                    "description": "วันที่รื้อถอนนั่งร้าน",
                                    "default": "2022-04-15"
                                },
                                "Area": {
                                    "type": "string",
                                    "maxLength": 12,
                                    "description": "รหัสสถานที่ปฏิบัติงานหลัก"
                                },
                                "AreaName": {
                                    "type": "string",
                                    "maxLength": 30,
                                    "description": "ชื่อสถานที่ปฏิบัติงานหลัก",
                                    "default": "GSP1"
                                },
                                "SubArea": {
                                    "type": "string",
                                    "maxLength": 12,
                                    "description": "รหัสสถานที่ปฏิบัติงานย่อย"
                                },
                                "SubAreaName": {
                                    "type": "string",
                                    "maxLength": 30,
                                    "description": "ชื่อสถานที่ปฏิบัติงานย่อย",
                                    "default": "GSP2"
                                },
                                "FeaturesPropertiesColor": {
                                    "type": "string",
                                    "description": "",
                                    "default": "ติดตั้งนั่งร้านแบบเคลื่อนที่ได้"
                                },
                                "Features": {
                                    "type": "object",
                                    "description": "ข้อมูลพิกัดนั่งร้าน"
                                },
                                // "FeaturesProperties": {
                                //     "type": "object",
                                //     "description": "ข้อมูลคุณสมบัตินั่งร้าน"
                                // },
                                // "FeaturesPropertiesCentroid": {
                                //     "type": "array",
                                //     "description": "ข้อมูลจุดกึ่งกลางนั่งร้าน x,y"
                                // },
                                // "FeaturesPropertiesCentroid_X": {
                                //     "type": "number",
                                //     "description": "จุดกึ่งกลาง Barrier/Geofence ตำแหน่ง Lattitude"
                                // },
                                // "FeaturesPropertiesCentroid_Y": {
                                //     "type": "number",
                                //     "description": "จุดกึ่งกลาง Barrier/Geofence ตำแหน่ง Longtitude"
                                // },
                                // "FeaturesGeomety": {
                                //     "type": "object",
                                //     "description": "ข้อมูลรูปทรงนั่งร้าน"
                                // },
                                // "FeaturesGeometyType": {
                                //     "type": "number",
                                //     "description": "ประเภทของ Barrier/Geofence"
                                // },
                                // "FeaturesGeometyCoordinates": {
                                //     "type": "array",
                                //     "description": "พิกัดของ Geomety(x,y) แต่ละจุดของนั่งร้าน"
                                // },
                                "WorkingStartDate": {
                                    "type": "string",
                                    "maxLength": 19,
                                    "description": "วัน-เวลาเริ่มต้นการปฏิบัติงาน",
                                    "default": "2022-04-01 08:00:00"
                                },
                                "WorkingEndDate": {
                                    "type": "string",
                                    "maxLength": 19,
                                    "description": "วัน-เวลาสิ้นสุดการปฏิบัติงาน",
                                    "default": "2022-04-15 17:00:00"
                                },
                                "VendorCode": {
                                    "type": "string",
                                    "maxLength": 30,
                                    "description": "รหัสบริษัทผู้รับเหมา",
                                    "default": "1000xxx"
                                },
                                "VendorName": {
                                    "type": "string",
                                    "maxLength": 50,
                                    "description": "ชื่อบริษัทผู้รับเหมา",
                                    "default": "Safety Service Co., Ltd."
                                },
                                "PTTStaffCode": {
                                    "type": "string",
                                    "maxLength": 10,
                                    "description": "รหัสผู้ควบคุมงาน",
                                    "default": "1000xxx"
                                },
                                "PTTStaff": {
                                    "type": "string",
                                    "maxLength": 100,
                                    "description": "ชื่อผู้ควบคุมงาน",
                                    "default": "อนุรักษ์ สกุลดี"
                                },
                                "AgencyID": {
                                    "type": "string",
                                    "maxLength": 10,
                                    "description": "รหัสหน่วยงานผู้ควบคุม",
                                    "default": "4000xxx"
                                },
                                "AgencyName": {
                                    "type": "string",
                                    "maxLength": 100,
                                    "description": "ชื่อหน่วยงานผู้ควบคุม",
                                    "default": "หน่วยงาน ปภ.ผยก."
                                },
                                "Owner": {
                                    "type": "string",
                                    "maxLength": 10,
                                    "description": "รหัสเจ้าของพื้นที่",
                                    "default": "1000xxx"
                                },
                                "OwnerName": {
                                    "type": "string",
                                    "maxLength": 100,
                                    "description": "ชื่อเจ้าของพื้นที่",
                                    "default": "อารีย์ โอบอ้อม"
                                },
                                "WorkpermitType": {
                                    "type": "string",
                                    "maxLength": 30,
                                    "description": "ประเภทของ Work",
                                    "default": "Scaffolding Permit"
                                },
                                "StatusID": {
                                    "type": "string",
                                    "maxLength": 4,
                                    "description": "รหัสสถานะใบงาน",
                                    "default": "1000xxx"
                                },
                                "StatusName": {
                                    "type": "string",
                                    "maxLength": 50,
                                    "description": "สถานะใบงาน",
                                    "default": "Open"
                                },
                                "WarningStatusID": {
                                    "type": "string",
                                    "description": "รหัสสถานะแจ้งเตือน",
                                    "default": "02"
                                },
                                "WarningStatus": {
                                    "type": "string",
                                    "description": "สถานะแจ้งเตือน",
                                    "default": "นั่งร้านหมดอายุ"
                                }
                            }
                        }
                    }
                }
            ],
            "responses": {},
            "security": [
                {
                    "Bearer": []
                }
            ]
        }
    },
    "/api/webhook/workpermit": {
        "post": {
            "x-swagger-router-controller": "webhook/workpermit",
            "tags": [
                "WEBHOOK"
            ],
            "description": "สำหรับรับข้อมูลนั่งร้านที่ติดตั้งในพื้นที่จาก Workpermit Management",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": [
                                "fullName",
                                "iDCard",
                                "workPermitNo",
                                "workTypeID",
                                "workType",
                                "locationID",
                                "location",
                                "subLocationID",
                                "workStartDate",
                                "workEndDate",
                                "workStartTime",
                                "workEndTime",
                                "companyCode",
                                "companyName",
                                "supervisorCode",
                                "supervisorFName",
                                "supervisorLName",
                                "supervisorDep",
                                // "approverCode",
                                // "approverFName",
                                // "approverLName",
                                "workpermitStatusId",
                                "workpermitStatus",
                                "gasMeasurement"
                            ],
                            "properties": {
                                "fullName": {
                                    "type": "string",
                                    "default": "สมชาย",
                                    "description": "ชื่อ"
                                },
                                "iDCard": {
                                    "type": "string",
                                    "default": "1234567890123",
                                    "description": "เลขบัตรประชาชน"
                                },
                                "workPermitNo": {
                                    "type": "string",
                                    "default": "NMOD-02119",
                                    "description": "เลข Work Permit"
                                },
                                "workTypeID": {
                                    "type": "string",
                                    "default": "HT1",
                                    "description": "รหัสประเภทของ work"
                                },

                                "workType": {
                                    "type": "string",
                                    "default": "Hot work",
                                    "description": "ประเภทของ work"
                                },
                                "description": {
                                    "type": "string",
                                    "default": "ตรวจแยกก๊าซ",
                                    "description": "รายละเอียดของงาน"
                                },
                                "locationID": {
                                    "type": "string",
                                    "default": "",
                                    "description": ""
                                },
                                "areaID": {
                                    "type": "string",
                                    "default": "1",
                                    "description": "รหัสสถานที่ปฏิบัติงานหลัก(plant)"
                                },
                                "location": {
                                    "type": "string",
                                    "default": "GSP#1 Process",
                                    "description": "ชื่อสถานที่ปฏิบัติงานหลัก(plant)"
                                },
                                "subLocationID": {
                                    "type": "string",
                                    "description": ""
                                },
                                "subAreaID": {
                                    "type": "string",
                                    "default": "93",
                                    "description": "รหัสสถานที่ปฏิบัติงานย่อย(อาคาร)"
                                },
                                "subLocation": {
                                    "type": "string",
                                    "default": "Benfield2",
                                    "description": "ชื่อสถานที่ปฏิบัติงานย่อย(อาคาร)"
                                },
                                "workStartDate": {
                                    "type": "string",
                                    "default": "2022-04-01",
                                    "description": "วันที่เริ่มต้นของใบงาน"
                                },
                                "workEndDate": {
                                    "type": "string",
                                    "default": "2022-04-15",
                                    "description": "วันที่สิ้นสุดของใบงาน"
                                },
                                "workStartTime": {
                                    "type": "string",
                                    "default": "08:00",
                                    "description": "เวลาเริ่มต้นการปฏิบัติงาน"
                                },
                                "workEndTime": {
                                    "type": "string",
                                    "default": "17:00",
                                    "description": "เวลาสิ้นสุดการปฏิบัติงาน"
                                },
                                "companyCode": {
                                    "type": "string",
                                    "default": "3000xxx",
                                    "description": "รหัสบริษัท"
                                },
                                "companyName": {
                                    "type": "string",
                                    "default": "Safety Service Co., Ltd.",
                                    "description": "ชื่อบริษัท"
                                },
                                "supervisorCode": {
                                    "type": "string",
                                    "default": "1000xxx",
                                    "description": "รหัสผู้ควบคุมงาน"
                                },
                                "supervisorFName": {
                                    "type": "string",
                                    "default": "",
                                    "description": ""
                                },
                                "supervisorLName": {
                                    "type": "string",
                                    "default": "",
                                    "description": ""
                                },
                                "supervisorDep": {
                                    "type": "string",
                                    "default": "หน่วยงาน ปภ.ผยก.",
                                    "description": "ชื่อหน่วยงานผู้ควบคุม"
                                },
                                "approverCode": {
                                    "type": "string",
                                    "default": "2000xxx",
                                    "description": "รหัสเจ้าของพื้นที่"
                                },
                                "approverFName": {
                                    "type": "string",
                                    "default": "วีรยุทธ อ่อนน้อม",
                                    "description": "ชื่อเจ้าของพื้นที่"
                                },
                                "approverLName": {
                                    "type": "string",
                                    "default": "วีรยุทธ อ่อนน้อม",
                                    "description": "นามสกุลเจ้าของพื้นที่"
                                },
                                "workpermitStatusId": {
                                    "type": "string",
                                    "default": "W07",
                                    "description": "รหัสสถานะใบงาน"
                                },
                                "workpermitStatus": {
                                    "type": "string",
                                    "default": "Waiting for Close (Allower)",
                                    "description": "สถานะใบงาน"
                                },
                                "gasMeasurement": {
                                    "type": "string",
                                    "default": "15:00",
                                    "description": `เวลาการตรวจวัดก๊าซล่าสุด
                                    (ส่งมาในกรณีเป็น Hot work และหากเป็นประเภท Work อื่น แล้วในระบบมีการเช็คการตรวจวัดก๊าซ)
                                    *เจ้าของพื้นที่/หน่วยงาน ปภ.ผยก แจ้งเตือนทุก 3 ชั่วโมง
                                    **ผู้ควบคุมงานแจ้งเตือนทุก 1 ชั่วโมง
                                    `
                                },
                                "impairmentName": {
                                    "type": "array",
                                    "example": ["ถังดับเพลิง"],
                                    "description": "ชื่ออุปกรณ์ที่ Impairment"
                                },
                                "impairment_No": {
                                    "type": "array",
                                    "example": ["200xxx"],
                                    "description": "รหัสอุปกรณ์ที่ Impairment"
                                },
                                "impairmentArea": {
                                    "type": "array",
                                    "example": ["GSP2 "],
                                    "description": "สถานที่ติดตั้งของอุปกรณ์ที่ Impairment"
                                },
                                "lat": {
                                    "type": "array",
                                    "example": ["18.33444"],
                                    "description": "พิกัด Latitude ของอุปกรณ์ที่ Impairment"
                                },
                                "long": {
                                    "type": "array",
                                    "example": ["20.23112"],
                                    "description": "พิกัด Longtitude ของอุปกรณ์ที่ Impairment"
                                },
                                "impairmentType": {
                                    "type": "array",
                                    "example": ["ระงับเหตุอัคคีภัย"],
                                    "description": "ประเภทของอุปกรณ์ที่ Impairment"
                                },
                                "impairmentStart": {
                                    "type": "array",
                                    "example": ["2022-04-01"],
                                    "description": "วัน-เวลาเริ่มต้นของอุปกรณ์ที่ Impairment"
                                },
                                "impairmentEnd": {
                                    "type": "array",
                                    "example": ["2022-04-30"],
                                    "description": "วัน-เวลาสิ้นสุดของอุปกรณ์ที่ Impairment"
                                },
                                "impairmentStatus": {
                                    "type": "array",
                                    "example": ["2"],
                                    "description": `"สถานะของอุปกรณ์ที่ Impairment
                                    มี 1= ไม่กีดขวาง 2= กีดขวาง"`
                                }

                            }
                        }
                    }

                }
            ],
            "responses": {},
            "security": [
                {
                    "Bearer": []
                }
            ]
        }
    },
    "/api/webhook/accesscontrol": {
        "post": {
            "x-swagger-router-controller": "webhook/accesscontrol",
            "tags": [
                "WEBHOOK"
            ],
            "description": "สำหรับรับข้อมูลบุคคลเข้าออกพื้นที่ จากระบบ Access Control",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": [
                                "FirstName",
                                "LastName",
                                "PersonalID",
                                // "WorkPermitID",
                                "CardTypeID",
                                "PersonalTypeID",
                                "ACC_ID",
                                "ScanStatus",
                                "ScanDate",
                                "ScanTime",
                                // "PersonGPS_ID",
                                "ExchangeCardDate",
                                "ExchangeCardTime",
                                "ExchangeCardStatus",
                                "PTTStaffCode",
                                "PTTStaffFirstName",
                                "PTTStaffLastName",
                                // "OwnerID",
                                // "OwnerName",
                                "AgencyCode",
                                "AgencyName",
                                "OnPlant"
                            ],
                            "properties": {
                                "TitleName": {
                                    "type": "string",
                                    "default": "นาย",
                                    "description": "คำนำหน้า"
                                },
                                "FirstName": {
                                    "type": "string",
                                    "default": "สมชาย",
                                    "description": "ชื่อ"
                                },
                                "LastName": {
                                    "type": "string",
                                    "default": "กล้าหาญ",
                                    "description": "นามสกุล"
                                },
                                "PersonalID": {
                                    "type": "string",
                                    "default": "1234567890123",
                                    "description": "เลขบัตรประชาชน/เลขที่หนังสือเดินทาง"
                                },
                                "Position": {
                                    "type": "string",
                                    "default": "ช่างไฟ",
                                    "description": "ตำแหน่ง"
                                },
                                "WorkPermitID": {
                                    "type": "string",
                                    "default": "01011110",
                                    "description": "เลข Work Permit"
                                },
                                "SecureCardID": {
                                    "type": "string",
                                    "default": "0001",
                                    "description": "เลขที่บัตรแสดงตัว/เลขที่บัตรที่แลก"
                                },
                                "CardTypeID": {
                                    "type": "string",
                                    "default": "3",
                                    "description": `
                                        "ประเภทบัตรที่แลก
                                        1=บัตรผู้มาติดต่อ,
                                        2=บัตรผู้เยี่ยมชม,
                                        3=บัตรผู้รับเหมา"
                                    `
                                },
                                "PersonalTypeID": {
                                    "type": "string",
                                    "default": "1",
                                    "description": `
                                        "ประเภทบุคคล
                                        1=ผู้รับเหมาประจำ,
                                        2=ผู้รับเหมาชั่วคราว,
                                        3=ผู้มาติดต่อ,
                                        4= ผู้เยี่ยมชม, 
                                        5= พนักงาน ปตท. "
                                    `
                                },
                                "ACC_ID": {
                                    "type": "string",
                                    "default": "",
                                    "description": "รหัสอุปกรณ์ที่สแกน"
                                },
                                "ScanStatus": {
                                    "type": "string",
                                    "default": "1",
                                    "description": `
                                        "สถานะการสแกน
                                        1 = สแกนเข้า
                                        2 = สแกนออก"`
                                },
                                "ScanDate": {
                                    "type": "string",
                                    "default": "2022-04-01",
                                    "description": "วันที่ที่ทำการสแกน"
                                },
                                "ScanTime": {
                                    "type": "string",
                                    "default": "15:00:00",
                                    "description": "เวลาที่ทำการสแกน"
                                },
                                "PersonGPS_ID": {
                                    "type": "string",
                                    "default": "100xxx",
                                    "description": "เลขที่อุปกรณ์ติดตามตัว"
                                },
                                "VehicleGPS_ID": {
                                    "type": "string",
                                    "default": "200xxx",
                                    "description": "เลขที่อุปกรณ์ติดตามยานพาหนะ"
                                },
                                "ExchangeCardDate": {
                                    "type": "string",
                                    "default": "2022-04-28",
                                    "description": "วันที่ทำการแลกบัตร"
                                },
                                "ExchangeCardTime": {
                                    "type": "string",
                                    "default": "08:30:00",
                                    "description": "เวลาที่ทำการแลกบัตร"
                                },
                                "ExchangeOTCard": {
                                    "type": "boolean",
                                    "default": true,
                                    "description": "ช่วงแลกบัตรล่วงหน้า"
                                },
                                "ExchangeCardStatus": {
                                    "type": "string",
                                    "default": "1",
                                    "description": `
                                        "สถานะการแลกบัตร (
                                        1=เข้า,
                                        2=ออก,
                                        3=คืนบัตร,
                                        4=De-Activate,
                                        5=Activate)"
                                    `
                                },
                                "Reason": {
                                    "type": "string",
                                    "default": "แลกบัตรผ่านเข้าพื้นที่ชั่วคราว",
                                    "description": "เหตุผล (เพิ่มเติม)"
                                },
                                "PTTStaffCode": {
                                    "type": "string",
                                    "default": "1000xxx",
                                    "description": "รหัสผู้ควบคุมงาน"
                                },
                                "PTTStaffFirstName": {
                                    "type": "string",
                                    "default": "สุรชัย ",
                                    "description": "ชื่อผู้ควบคุมงาน"
                                },
                                "PTTStaffLastName": {
                                    "type": "string",
                                    "default": "ทองดี",
                                    "description": "นามสกุลผู้ควบคุมงาน"
                                },
                                "OwnerID": {
                                    "type": "string",
                                    "default": "2000xxx",
                                    "description": "รหัสเจ้าของพื้นที่"
                                },
                                "OwnerName": {
                                    "type": "string",
                                    "default": "นายวีรยุทธ อ่อนน้อม",
                                    "description": `ชื่อเจ้าของพื้นที่`
                                },
                                "AgencyCode": {
                                    "type": "string",
                                    "default": "4000xxx",
                                    "description": "รหัสหน่วยงานผู้ควบคุม"
                                },
                                "AgencyName": {
                                    "type": "string",
                                    "default": "หน่วยงาน ปภ.ผยก.",
                                    "description": `ชื่อหน่วยงานผู้ควบคุม`
                                },
                                "OnPlant": {
                                    "type": "boolean",
                                    "default": true,
                                    "description": `สถานะการเข้าสู่ฐานการผลิต`
                                }

                            }
                        }
                    }

                }
            ],
            "responses": {},
            "security": [
                {
                    "Bearer": []
                }
            ]
        }
    },
    // "/api/webhook/accesscontrol/put": {
    //     "put": {
    //         "x-swagger-router-controller": "webhook/accesscontrol",
    //         "tags": [
    //             "WEBHOOK"
    //         ],
    //         "description": "สำหรับรับข้อมูลบุคคลเข้าออกพื้นที่ จากระบบ Access Control",
    //         "parameters": [
    //             {
    //                 "in": "body",
    //                 "name": "body",
    //                 "schema": {
    //                     "type": "array",
    //                     "items": {
    //                         "type": "object",
    //                         "required": [
    //                             "FirstName",
    //                             "LastName",
    //                             "PersonalID",
    //                             "WorkPermitID",
    //                             "CardTypeID",
    //                             "PersonalTypeID",
    //                             "ACC_ID",
    //                             "ScanStatus",
    //                             "ScanDate",
    //                             "ScanTime",
    //                             "PersonGPS_ID",
    //                             "ExchangeCardDate",
    //                             "ExchangeCardTime",
    //                             "ExchangeCardStatus",
    //                             "PTTStaffCode",
    //                             "PTTStaffFirstName",
    //                             "PTTStaffLastName",
    //                             "AgencyCode",
    //                             "AgencyName",
    //                             "OnPlant"
    //                         ],
    //                         "properties": {
    //                             "TitleName": {
    //                                 "type": "string",
    //                                 "default": "นาย",
    //                                 "description": "คำนำหน้า"
    //                             },
    //                             "FirstName": {
    //                                 "type": "string",
    //                                 "default": "สมชาย",
    //                                 "description": "ชื่อ"
    //                             },
    //                             "LastName": {
    //                                 "type": "string",
    //                                 "default": "กล้าหาญ",
    //                                 "description": "นามสกุล"
    //                             },
    //                             "PersonalID": {
    //                                 "type": "string",
    //                                 "default": "1234567890123",
    //                                 "description": "เลขบัตรประชาชน/เลขที่หนังสือเดินทาง"
    //                             },
    //                             "Position": {
    //                                 "type": "string",
    //                                 "default": "ช่างไฟ",
    //                                 "description": "ตำแหน่ง"
    //                             },
    //                             "WorkPermitID": {
    //                                 "type": "string",
    //                                 "default": "01011110",
    //                                 "description": "เลข Work Permit"
    //                             },
    //                             "SecureCardID": {
    //                                 "type": "string",
    //                                 "default": "0001",
    //                                 "description": "เลขที่บัตรแสดงตัว/เลขที่บัตรที่แลก"
    //                             },
    //                             "CardTypeID": {
    //                                 "type": "string",
    //                                 "default": "3",
    //                                 "description": `
    //                                     "ประเภทบัตรที่แลก
    //                                     1=บัตรผู้มาติดต่อ,
    //                                     2=บัตรผู้เยี่ยมชม,
    //                                     3=บัตรผู้รับเหมา"
    //                                 `
    //                             },
    //                             "PersonalTypeID": {
    //                                 "type": "string",
    //                                 "default": "1",
    //                                 "description": `
    //                                     "ประเภทบุคคล
    //                                     1=ผู้รับเหมาประจำ,
    //                                     2=ผู้รับเหมาชั่วคราว,
    //                                     3=ผู้มาติดต่อ,
    //                                     4= ผู้เยี่ยมชม, 
    //                                     5= พนักงาน ปตท. "
    //                                 `
    //                             },
    //                             "ACC_ID": {
    //                                 "type": "string",
    //                                 "default": "",
    //                                 "description": "รหัสอุปกรณ์ที่สแกน"
    //                             },
    //                             "ScanStatus": {
    //                                 "type": "string",
    //                                 "default": "1",
    //                                 "description": `
    //                                     "สถานะการสแกน
    //                                     1 = สแกนเข้า
    //                                     2 = สแกนออก"`
    //                             },
    //                             "ScanDate": {
    //                                 "type": "string",
    //                                 "default": "2022-04-01",
    //                                 "description": "วันที่ที่ทำการสแกน"
    //                             },
    //                             "ScanTime": {
    //                                 "type": "string",
    //                                 "default": "15:00:00",
    //                                 "description": "เวลาที่ทำการสแกน"
    //                             },
    //                             "PersonGPS_ID": {
    //                                 "type": "string",
    //                                 "default": "100xxx",
    //                                 "description": "เลขที่อุปกรณ์ติดตามตัว"
    //                             },
    //                             "VehicleGPS_ID": {
    //                                 "type": "string",
    //                                 "default": "200xxx",
    //                                 "description": "เลขที่อุปกรณ์ติดตามยานพาหนะ"
    //                             },
    //                             "ExchangeCardDate": {
    //                                 "type": "string",
    //                                 "default": "2022-04-28",
    //                                 "description": "วันที่ทำการแลกบัตร"
    //                             },
    //                             "ExchangeCardTime": {
    //                                 "type": "string",
    //                                 "default": "08:30:00",
    //                                 "description": "เวลาที่ทำการแลกบัตร"
    //                             },
    //                             "ExchangeOTCard": {
    //                                 "type": "boolean",
    //                                 "default": true,
    //                                 "description": "ช่วงแลกบัตรล่วงหน้า"
    //                             },
    //                             "ExchangeCardStatus": {
    //                                 "type": "string",
    //                                 "default": "1",
    //                                 "description": `
    //                                     "สถานะการแลกบัตร (
    //                                     1=เข้า,
    //                                     2=ออก,
    //                                     3=คืนบัตร,
    //                                     4=De-Activate,
    //                                     5=Activate)"
    //                                 `
    //                             },
    //                             "Reason": {
    //                                 "type": "string",
    //                                 "default": "แลกบัตรผ่านเข้าพื้นที่ชั่วคราว",
    //                                 "description": "เหตุผล (เพิ่มเติม)"
    //                             },
    //                             "PTTStaffCode": {
    //                                 "type": "string",
    //                                 "default": "1000xxx",
    //                                 "description": "รหัสผู้ควบคุมงาน"
    //                             },
    //                             "PTTStaffFirstName": {
    //                                 "type": "string",
    //                                 "default": "สุรชัย ",
    //                                 "description": "ชื่อผู้ควบคุมงาน"
    //                             },
    //                             "PTTStaffLastName": {
    //                                 "type": "string",
    //                                 "default": "ทองดี",
    //                                 "description": "นามสกุลผู้ควบคุมงาน"
    //                             },
    //                             "AgencyCode": {
    //                                 "type": "string",
    //                                 "default": "4000xxx",
    //                                 "description": "รหัสหน่วยงานผู้ควบคุม"
    //                             },
    //                             "AgencyName": {
    //                                 "type": "string",
    //                                 "default": "หน่วยงาน ปภ.ผยก.",
    //                                 "description": `ชื่อหน่วยงานผู้ควบคุม`
    //                             },
    //                             "OnPlant": {
    //                                 "type": "boolean",
    //                                 "default": true,
    //                                 "description": `สถานะการเข้าสู่ฐานการผลิต`
    //                             }

    //                         }
    //                     }
    //                 }

    //             }
    //         ],
    //         "responses": {},
    //         "security": [
    //             {
    //                 "Bearer": []
    //             }
    //         ]
    //     }
    // },
    "/api/webhook/accesscontroldevice": {
        "post": {
            "x-swagger-router-controller": "webhook/accesscontroldevice",
            "tags": [
                "WEBHOOK"
            ],
            "description": "สำหรับรับข้อมูลอุปกรณ์ Access Control จากระบบ Access Control",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": [
                                "AccDeviceID",
                                "AccDeviceName",
                                "Lat",
                                "Long",
                                "AccDeviceStatus",
                                "AreaID",
                                "AreaName"
                            ],
                            "properties": {
                                "AccDeviceID": {
                                    "type": "string",
                                    "default": "",
                                    "description": "รหัสอุปกรณ์"
                                },
                                "AccDeviceName": {
                                    "type": "string",
                                    "default": "สมชาย",
                                    "description": "ชื่ออุปกรณ์"
                                },
                                "Lat": {
                                    "type": "string",
                                    "default": "18.33444",
                                    "description": "พิกัด Latitude ของอุปกรณ์"
                                },
                                "Long": {
                                    "type": "string",
                                    "default": "20.23112",
                                    "description": "พิกัด Longtitude ของอุปกรณ์"
                                },
                                "AccDeviceStatus": {
                                    "type": "string",
                                    "default": "1",
                                    "description": "สถานะอุปกรณ์ (0=offline, 1=online)"
                                },
                                "AreaID": {
                                    "type": "string",
                                    "default": "1",
                                    "description": "รหัสสถานที่ติดตั้งอุปกรณ์(plant)"
                                },
                                "AreaName": {
                                    "type": "string",
                                    "default": "GSP#1 Process",
                                    "description": "ชื่อสถานที่ติดตั้งอุปกรณ์(plant)"
                                },
                                "SubAreaID": {
                                    "type": "string",
                                    "default": "93",
                                    "description": "รหัสสถานที่ติดตั้งอุปกรณ์ย่อย(อาคาร)"
                                },
                                "SubAreaName": {
                                    "type": "string",
                                    "default": "Benfield2",
                                    "description": "ชื่อสถานที่ติดตั้งอุปกรณ์ย่อย(อาคาร)"
                                }

                            }
                        }
                    }

                }
            ],
            "responses": {},
            "security": [
                {
                    "Bearer": []
                }
            ]
        }
    },
    "/api/webhook/accesscontrolexchangecard": {
        "post": {
            "x-swagger-router-controller": "webhook/accesscontrolexchangecard",
            "tags": [
                "WEBHOOK"
            ],
            "description": "ข้อมูลแบบ Summary การแลกบัตรเข้า-ออก แบบ Realtime  จากระบบ Access Control ",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "required": [
                            "ExchangeCardIn",
                            "ExchangeCardOut"
                        ],
                        "properties": {
                            "ExchangeCardIn": {
                                "type": "string",
                                "description": "ผลรวมจำนวนบุคคลแลกบัตรเข้าพื้นที่"
                            },
                            "ExchangeCardOut": {
                                "type": "string",
                                "description": "ผลรวมจำนวนบุคคลแลกบัตรออกพื้นที่"
                            }

                        }

                    }

                }
            ],
            "responses": {},
            "security": [
                {
                    "Bearer": []
                }
            ]
        }
    },
    "/api/webhook/equipment": {
        "post": {
            "x-swagger-router-controller": "webhook/equipment",
            "tags": [
                "WEBHOOK"
            ],
            "description": " สำหรับรับข้อมูลอุปกรณ์ที่ติดตั้งในพื้นที่ จากระบบ Equipment Management",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": [
                                "Name",
                                "PersonalID ",
                                "EquipmentID",
                                "EquipmentTypeCode",
                                "EquipmentType",
                                "EquipmentName",
                                "Inspect_Status",
                                "risk_equipment",
                                "AreaName",
                                "CompanyID",
                                "CompanyName",
                                "PTTStaffCode",
                                "PTTStaffName",
                                "AgencyCode",
                                "AgencyName",
                                "StatusID",
                                "Status"
                            ],
                            "properties": {
                                "Name": {
                                    "type": "string",
                                    "default": "สมชาย กล้าหาญ",
                                    "description": "ชื่อ-นามสกุล"
                                },
                                "PersonalID": {
                                    "type": "string",
                                    "default": "1234567890123",
                                    "description": "เลขบัตรประชาชน"
                                },
                                "WorkPermitNo": {
                                    "type": "string",
                                    "default": "NMOD-02120",
                                    "description": "เลข Work Permit"
                                },
                                "EquipmentID": {
                                    "type": "string",
                                    "default": "EQM049",
                                    "description": "รหัสอุปกรณ์"
                                },
                                "EquipmentTypeCode": {
                                    "type": "string",
                                    "default": "1",
                                    "description": "รหัสประเภทของอุปกรณ์"
                                },
                                "EquipmentType": {
                                    "type": "string",
                                    "default": "อุปกรณ์เครื่องกล",
                                    "description": "ประเภทของอุปกรณ์"
                                },
                                "EquipmentName": {
                                    "type": "string",
                                    "default": "เครื่องเจาะ",
                                    "description": "ชื่ออุปกรณ์"
                                },
                                "Inspect_Status": {
                                    "type": "string",
                                    "default": "1",
                                    "description": `
                                        "0 = อุปกรณ์ที่ไม่ Inspect
                                        1 = อุปกรณ์ที่ Inspect "
                                    `
                                },
                                "risk_equipment": {
                                    "type": "string",
                                    "default": "1",
                                    "description": `
                                        0 = ไม่เป็นอุปกรณ์เสี่ยง
                                        1 = เป็นอุปกรณ์เสี่ยง
                                    `
                                },
                                "DateTime_In": {
                                    "type": "string",
                                    "default": "2022-04-01 8:00:00",
                                    "description": "วัน-เวลา นำอุปกรณ์เข้าพื้นที่"
                                },
                                "DateTime_Out": {
                                    "type": "string",
                                    "default": "2022-04-15 17:00:00",
                                    "description": `วัน-เวลา นำอุปกรณ์ออกพื้นที่`
                                },
                                "ExpiredDate": {
                                    "type": "string",
                                    "default": "2022-05-30",
                                    "description": "วันที่ หมดอายุสภาพ"
                                },
                                "description": {
                                    "type": "string",
                                    "default": "ติดตั้งเครื่องแยกก๊าซ",
                                    "description": "รายละเอียดของงาน"
                                },
                                "Objective": {
                                    "type": "string",
                                    "default": "ติดตั้งเครื่องแยกก๊าซ",
                                    "description": "วัตถุประสงค์"
                                },
                                "AreaID": {
                                    "type": "string",
                                    "default": "200xxx",
                                    "description": "รหัสสถานที่ปฏิบัติงานหลัก(plant)"
                                },
                                "AreaName": {
                                    "type": "string",
                                    "default": "GSP#1 Process ",
                                    "description": "ชื่อสถานที่ปฏิบัติงานหลัก(plant)"
                                },
                                "CompanyID": {
                                    "type": "string",
                                    "default": "3000xxx",
                                    "description": "รหัสบริษัท/หน่วยงาน"
                                },
                                "CompanyName": {
                                    "type": "string",
                                    "default": "Safety Service Co., Ltd.",
                                    "description": "ชื่อบริษัท/หน่วยงาน"
                                },
                                "PTTStaffCode": {
                                    "type": "string",
                                    "default": "1000xxx",
                                    "description": `รหัสผู้ควบคุมงาน`
                                },
                                "PTTStaffName": {
                                    "type": "string",
                                    "default": "สุรชัย ทองดี",
                                    "description": "ชื่อผู้ควบคุมงาน"
                                },
                                "AgencyCode": {
                                    "type": "string",
                                    "default": "4000xxx",
                                    "description": "รหัสหน่วยงานผู้ควบคุม"
                                },
                                "AgencyName": {
                                    "type": "string",
                                    "default": "หน่วยงาน ปภ.ผยก.",
                                    "description": "ชื่อหน่วยงานผู้ควบคุม"
                                },
                                "OwnerCode_1": {
                                    "type": "string",
                                    "default": "2000xxx",
                                    "description": "รหัสผู้อนุมัติคนที 1"
                                },
                                "OwnerName_1": {
                                    "type": "string",
                                    "default": "อารีย์ โอบอ้อม",
                                    "description": "ชื่อผู้อนุมัติคนที่ 1"
                                },
                                "OwnerCode_2": {
                                    "type": "string",
                                    "default": "",
                                    "description": "รหัสผู้อนุมัติคนที 2"
                                },
                                "OwnerName_2": {
                                    "type": "string",
                                    "default": "",
                                    "description": "ชื่อผู้อนุมัติคนที่ 2"
                                },
                                "OwnerCode_3": {
                                    "type": "string",
                                    "default": "",
                                    "description": "รหัสผู้อนุมัติคนที 3"
                                },
                                "OwnerName_3": {
                                    "type": "string",
                                    "default": "",
                                    "description": "ชื่อผู้อนุมัติคนที่ 3"
                                },
                                "StatusID": {
                                    "type": "string",
                                    "default": "AP",
                                    "description": `รหัสสถานะใบงาน`
                                },
                                "Status": {
                                    "type": "string",
                                    "default": "อนุมัติ",
                                    "description": `สถานะใบงาน`
                                },
                                "WarningStatus": {
                                    "type": "string",
                                    "default": "ใกล้หมดอายุ",
                                    "description": `สถานะแจ้งเตือนใกล้หมดอายุ / หมดอายุ`
                                }

                            }
                        }
                    }

                }
            ],
            "responses": {},
            "security": [
                {
                    "Bearer": []
                }
            ]
        }
    },
    "/api/webhook/vehicle1": {
        "post": {
            "x-swagger-router-controller": "webhook/vehicle1",
            "tags": [
                "WEBHOOK"
            ],
            "description": "สำหรับรับข้อมูลยานพาหนะที่เข้าพื้นที่จาก Vehicle Management",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": [
                                "Name",
                                "IDCard",
                                // "WorkPermitNo",
                                "VehicleID",
                                "VehicleTypeID",
                                "VehicleType",
                                // "License_Plate",
                                "AreaID",
                                "AreaName",
                                "WPM_AreaID",
                                "WPM_AreaName",
                                "Lat",
                                "Long",
                                "VehicleGPS_ID",
                                // "WorkStartDate",
                                // "WorkEndDate",
                                // "WorkStartTime",
                                // "WorkEndTime",
                                "CompanyCode",
                                "CompanyName",
                                "PTTStaffCode",
                                "PTTStaffName",
                                // "AgencyCode",
                                "AgencyName",
                                // "OwnerCode",
                                // "OwnerName",
                                // "WorkTypeID",
                                // "WorkTypeName",
                                // "WorksheetStatusId",
                                // "WorksheetStatus",
                                "Speed",
                                "degree"
                            ],
                            "properties": {

                                "sap_no": {
                                    "type": "string",
                                    "description": "SAP Maintenance No"
                                },
                                "Name": {
                                    "type": "string",
                                    "description": "ชื่อ-นามสกุล",
                                    "default": "นายสมชาย กล้าหาญ",
                                },
                                "IDCard": {
                                    "type": "string",
                                    "description": "เลขบัตรประชาชน",
                                    "default": "1234567890123",
                                },
                                "WorkPermitNo": {
                                    "type": "string",
                                    "description": "เลข Work Permit",
                                    "default": "NMOD-02120",
                                },
                                "VehicleID": {
                                    "type": "string",
                                    "description": "รหัสยานพาหนะ",
                                    "default": "VHM02120",
                                },
                                "VehicleTypeID": {
                                    "type": "string",
                                    "description": "รหัสประเภทของยานพาหนะ",
                                    "default": "xxx001",
                                },
                                "VehicleType": {
                                    "type": "string",
                                    "description": "ประเภทของยานพาหนะ",
                                    "default": "รถบรรทุก",
                                },
                                "License_Plate": {
                                    "type": "string",
                                    "description": "ทะเบียนรถ",
                                    "default": "กต-1234",
                                },
                                "VehicleParkID": {
                                    "type": "string",
                                    "description": "รหัสสถานที่จอดรถที่กำหนด",
                                    "default": "X001"
                                },
                                "VehiclePark": {
                                    "type": "string",
                                    "description": "ชื่อสถานที่จอดรถที่กำหนด"
                                },
                                "WorkName": {
                                    "type": "string",
                                    "description": "ชื่องาน",
                                    "default": "ขนย้ายนั่งร้าน"
                                },
                                "Detail": {
                                    "type": "string",
                                    "description": "รายละเอียดของงาน",
                                    "default": "ขนย้ายนั่งร้านไป GSP3"
                                },
                                "Objective": {
                                    "type": "string",
                                    "description": "วัตถุประสงค์",
                                    "default": "ขนย้ายนั่งร้านไป GSP3"
                                },
                                "AreaID": {
                                    "type": "string",
                                    "description": "รหัสสถานที่ปฏิบัติงานหลัก(plant)",
                                    "default": "1",
                                },
                                "AreaName": {
                                    "type": "string",
                                    "description": "ชื่อสถานที่ปฏิบัติงานหลัก(plant)",
                                    "default": "GSP#1 Process ",
                                },
                                "SubAreaID": {
                                    "type": "string",
                                    "description": "รหัสสถานที่ปฏิบัติงานย่อย(อาคาร)",
                                    "default": "93"
                                },
                                "SubAreaName": {
                                    "type": "string",
                                    "description": "ชื่อสถานที่ปฏิบัติงานย่อย(อาคาร)",
                                    "default": "Benfield2"
                                },
                                "WPM_AreaID": {
                                    "type": "string",
                                    "description": "รหัสสถานที่ปฏิบัติงานหลัก(plant)"
                                },
                                "WPM_AreaName": {
                                    "type": "string",
                                    "description": "ชื่อสถานที่ปฏิบัติงานหลัก(plant)"
                                },
                                "WPM_SubAreaID": {
                                    "type": "string",
                                    "description": "รหัสสถานที่ปฏิบัติงานย่อย(อาคาร)",
                                },
                                "WPM_SubAreaName": {
                                    "type": "string",
                                    "description": "ชื่อสถานที่ปฏิบัติงานย่อย(อาคาร)",
                                },
                                "Lat": {
                                    "type": "string",
                                    "description": "พิกัด Latitude ของยานพาหนะ",
                                    "default": "18.33444",
                                },
                                "Long": {
                                    "type": "string",
                                    "description": "พิกัด Longtitude ของพาหนะ",
                                    "default": "20.23112",
                                },
                                "VehicleGPS_ID": {
                                    "type": "string",
                                    "description": "เลขที่อุปกรณ์ติดตามยานพาหนะ",
                                    "default": "200xxx",
                                },
                                "WorkStartDate": {
                                    "type": "string",
                                    "description": "วันที่เริ่มต้นของใบงาน",
                                    "default": "2022-05-15",
                                },
                                "WorkEndDate": {
                                    "type": "string",
                                    "description": "วันที่สิ้นสุดของใบงาน",
                                    "default": "2022-05-30",
                                },
                                "WorkStartTime": {
                                    "type": "string",
                                    "description": "เวลาเริ่มต้นการปฏิบัติงาน",
                                    "default": "08:00",
                                },
                                "WorkEndTime": {
                                    "type": "string",
                                    "description": "เวลาสิ้นสุดการปฏิบัติงาน",
                                    "default": "17:00",
                                },
                                "CompanyCode": {
                                    "type": "string",
                                    "description": "รหัสบริษัท",
                                    "default": "3000xxx",
                                },
                                "CompanyName": {
                                    "type": "string",
                                    "description": "ชื่อบริษัท",
                                    "default": "Safety Service Co., Ltd.",
                                },
                                "PTTStaffCode": {
                                    "type": "string",
                                    "description": "รหัสผู้ควบคุมงาน",
                                    "default": "1000xxx",
                                },
                                "PTTStaffName": {
                                    "type": "string",
                                    "description": "ชื่อผู้ควบคุมงาน",
                                    "default": "สุรชัย ทองดี",
                                },
                                "AgencyCode": {
                                    "type": "string",
                                    "description": "รหัสหน่วยงานผู้ควบคุม",
                                    "default": "4000xxx",
                                },
                                "AgencyName": {
                                    "type": "string",
                                    "description": "ชื่อหน่วยงานผู้ควบคุม",
                                    "default": "หน่วยงาน ปภ.ผยก.",
                                },
                                "OwnerCode": {
                                    "type": "string",
                                    "description": "รหัสเจ้าของพื้นที่",
                                    "default": "2000xxx",
                                },
                                "OwnerName": {
                                    "type": "string",
                                    "description": "ชื่อเจ้าของพื้นที่",
                                    "default": "อารีย์ โอบอ้อม",
                                },
                                "WorkTypeID": {
                                    "type": "string",
                                    "description": "รหัสประเภทของ work",
                                    "default": "HT1",
                                },
                                "WorkTypeName": {
                                    "type": "string",
                                    "description": "ประเภทของ work",
                                    "default": "Hot work",
                                },
                                "WorksheetStatusId": {
                                    "type": "string",
                                    "description": "รหัสสถานะใบงาน",
                                    "default": "W07",
                                },
                                "WorksheetStatus": {
                                    "type": "string",
                                    "description": "สถานะใบงาน",
                                    "default": "Waiting for Close (Allower)",
                                },
                                "Speed": {
                                    "type": "string",
                                    "description": "ความเร็วรถ ณ ขณะนั้น หน่วยกิโลเมตร/ชั่วโมง",
                                    "default": "50",
                                },
                                "WarningStatusId": {
                                    "type": "array", "items": {
                                        "type": "string",
                                    },
                                    "description": "รหัสสถานะแจ้งเตือน",
                                    "default": ["1", "2", "3", "4"]

                                },
                                "WarningStatus": {
                                    "type": "array", "items": {
                                        "type": "string",
                                    },
                                    "description": "สถานะแจ้งเตือน",
                                    "default": ["ขับนอกเส้นทาง", "ขับนอกพื้นที่ควบคุม (Geofencing) ตามใบขออนุญาตทำงาน", "จอดในจุดที่ไม่ได้กำหนด", "การใช้ความเร็วรถเกินความเร็วที่กำหนด"]
                                },
                                "Remove_GPS": {
                                    "type": "string",
                                    "description": "วัน-เวลา Remove ข้อมูล",
                                    "default": "2022-05-15 17:00"
                                },
                                "degree": {
                                    "type": "string",
                                    "description": "องศาของรถ",
                                    "default": "90",
                                }

                            }
                        }
                    }

                }
            ],
            "responses": {},
            "security": [
                {
                    "Bearer": []
                }
            ]
        }
    },
    "/api/webhook/vehicle2": {
        "post": {
            "x-swagger-router-controller": "webhook/vehicle2",
            "tags": [
                "WEBHOOK"
            ],
            "description": "สำหรับรับข้อมูลสถานที่จอดยานพาหนะที่เข้าพื้นที่จาก Vehicle Management",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": [
                                "VehicleParkID",
                                "VehicleParkName",
                                "AreaVehiclePark",
                            ],
                            "properties": {

                                "VehicleParkID": {
                                    "type": "string",
                                    "description": "รหัสสถานที่จอดรถ",
                                    "default": "X001"
                                },
                                "VehicleParkName": {
                                    "type": "string",
                                    "description": "ชื่อสถานที่จอดรถ",
                                    "default": "นายสมชาย กล้าหาญ",
                                },
                                "AreaVehiclePark": {
                                    "type": "object",
                                    "description": "พิกัดสถานที่จอดรถ",
                                },
                                "Remove_Park": {
                                    "type": "string",
                                    "description": "วัน-เวลา Remove ข้อมูล",
                                    "default": "2022-05-15  17:00:00",
                                }
                            }
                        }
                    }

                }
            ],
            "responses": {},
            "security": [
                {
                    "Bearer": []
                }
            ]
        }
    },
    "/api/webhook/vehicle3": {
        "post": {
            "x-swagger-router-controller": "webhook/vehicle3",
            "tags": [
                "WEBHOOK"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": [
                                "ObstructionTypeID",
                                "ObstructionType",
                                "ObstructionID",
                                "ObstructionArea",
                                "ObstructionStatus"
                            ],
                            "properties": {
                                "ObstructionTypeID": {
                                    "type": "string",
                                    "default": "1",
                                    "description": "รหัสประเภทสิ่งกีดขวาง"
                                },
                                "ObstructionType": {
                                    "type": "string",
                                    "default": "Equipment",
                                    "description": "ประเภทสิ่งกีดขวาง"
                                },
                                "ObstructionID": {
                                    "type": "string",
                                    "default": "xxx001",
                                    "description": "รหัสสิ่งกีดขวาง"
                                },
                                "ObstructionArea": {
                                    "type": "string",
                                    "default": {
                                        "type": "Feature",
                                        "properties": {
                                            "centroid": [101.14686772227287, 12.722390027874555]
                                        },
                                        "geometry": {
                                            "type": "Polygon",
                                            "coordinates": [
                                                [
                                                    [
                                                        101.14682078361511,
                                                        12.72237956244667
                                                    ],
                                                    [
                                                        101.14688783884048,
                                                        12.722342933445697
                                                    ],
                                                    [
                                                        101.14692270755768,
                                                        12.72239526058833
                                                    ],
                                                    [
                                                        101.14684760570526,
                                                        12.72244235500748
                                                    ],
                                                    [
                                                        101.14682078361511,
                                                        12.72237956244667
                                                    ]
                                                ]
                                            ]
                                        }
                                    },
                                    "description": "พิกัด"
                                },
                                "ObstructionStatus": {
                                    "type": "string",
                                    "default": "1",
                                    "description": `
                                        สถานะอุปกรณ์มี
                                        1 = ไม่กีดขวาง
                                        2 = กีดขวาง`
                                },
                                "Remove_Obstruction": {
                                    "type": "string",
                                    "default": "2022-04-15 17:00:00",
                                    "description": "วัน-เวลา Remove ข้อมูล"
                                },
                            }
                        }
                    }

                }
            ],
            "responses": {},
            "security": [
                {
                    "Bearer": []
                }
            ]
        }
    },
    "/api/webhook/vehicle5": {
        "post": {
            "x-swagger-router-controller": "webhook/vehicle5",
            "tags": [
                "WEBHOOK"
            ],
            "description": "สำหรับดึงข้อมูล รายการประเภทรถทั้งหมด",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": [
                                "id",
                                "vehicle_type",
                                "Icon",
                                "Icon_InMap",
                            ],
                            "properties": {

                                "id": {
                                    "type": "string",
                                    "description": "รหัสประเภทรถ",
                                    "default": "15 "
                                },
                                "vehicle_type": {
                                    "type": "string",
                                    "description": "ชื่อประเภทรถ",
                                    "default": "รถ SUV",
                                },
                                "Icon": {
                                    "type": "string",
                                    "description": "URL Icon รถ ",
                                },
                                "Icon_InMap": {
                                    "type": "string",
                                    "description": "URL Icon รถ ที่ใช้แสดงผลในแผนที่"
                                }
                            }
                        }
                    }

                }
            ],
            "responses": {},
            "security": [
                {
                    "Bearer": []
                }
            ]
        }
    },
    "/api/webhook/vehicle6": {
        "post": {
            "x-swagger-router-controller": "webhook/vehicle6",
            "tags": [
                "WEBHOOK"
            ],
            "description": "สำหรับรับข้อมูล รายการเข้า-ออกรถในพื้นที่ทั้งหมด",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "required": [
                            "VehicleInCount",
                            "VehicleOutCount"
                        ],
                        "properties": {
                            "VehicleInCount": {
                                "type": "string",
                                "description": "จำนวนรถเข้า"
                            },
                            "VehicleOutCount": {
                                "type": "string",
                                "description": "จำนวนรถออก"
                            }

                        }

                    }

                }
            ],
            "responses": {},
            "security": [
                {
                    "Bearer": []
                }
            ]
        }
    },
    "/api/webhook/people": {
        "post": {
            "x-swagger-router-controller": "webhook/people",
            "tags": [
                "WEBHOOK"
            ],
            "description": "สำหรับรับข้อมูลใบอนุญาตปฏิบัติงานในพื้นที่จาก People Motion Tracking",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": [
                                "Name",
                                "PersonalID",
                                // "WorkPermitNo",
                                "PeopleTypeID",
                                "PeopleType",
                                "PeopleImage",
                                // "PersonGPS_ID",
                                "AreaID",
                                "AreaName",
                                "WPM_AreaID",
                                "WPM_AreaName",
                                "Lat",
                                "Long",
                                // "WorkStartDate",
                                // "WorkEndDate",
                                // "WorkStartTime",
                                // "WorkEndTime",
                                "CompanyID",
                                "CompanyName",
                                "PTTStaffID",
                                "PTTStaffName",
                                "AgencyID",
                                "AgencyName",
                                // "OwnerID",
                                // "OwnerName",
                                // "WorkpermitType",
                                // "WorkPermitStatusID",
                                // "WorkPermitStatus"
                            ],
                            "properties": {
                                "Name": {
                                    "type": "string",
                                    "description": "ชื่อ-นามสกุล",
                                    "default": "นายสมชาย กล้าหาญ",

                                },
                                "PersonalID": {
                                    "type": "string",
                                    "description": "เลขบัตรประชาชน",
                                    "default": "1234567890123",

                                },
                                "WorkPermitNo": {
                                    "type": "string",
                                    "description": "เลข Work Permit",
                                    "default": "NMOD-02119",

                                },
                                "PeopleTypeID": {
                                    "type": "string",
                                    "description": "รหัสประเภทบุคคล",
                                    "default": "1",

                                },
                                "PeopleType": {
                                    "type": "string",
                                    "description": "ประเภทบุคคล (เช่น พนักงาน ปตท.,ผู้รับเหมา, เจ้าหน้าที่ความปลอดภัย, ผู้เฝ้าระวังไฟ, Visitor(ผู้มาติดต่อ,ผู้เยี่ยมชม) )",
                                    "default": "ผู้รับเหมา",

                                },
                                "PeopleImage": {
                                    "type": "string",
                                    "description": "URL ของไอคอน",

                                },
                                "PersonGPS_ID": {
                                    "type": "string",
                                    "description": "เลขที่อุปกรณ์ติดตามตัว",
                                    "default": "100xxx",

                                },
                                "AreaID": {
                                    "type": "string",
                                    "description": "รหัสสถานที่ปฏิบัติงานหลัก(plant)",
                                    "default": "1",

                                },
                                "AreaName": {
                                    "type": "string",
                                    "description": "ชื่อสถานที่ปฏิบัติงานหลัก(plant)",
                                    "default": "GSP#1 Process ",

                                },
                                "SubAreaID": {
                                    "type": "string",
                                    "description": "รหัสสถานที่ปฏิบัติงานย่อย(อาคาร)",
                                    "default": "93"
                                },
                                "SubAreaName": {
                                    "type": "string",
                                    "description": "ชื่อสถานที่ปฏิบัติงานย่อย(อาคาร)",
                                    "default": "Benfield2"
                                },
                                "WPM_AreaID": {
                                    "type": "string",
                                    "description": "รหัสสถานที่ปฏิบัติงานหลัก(plant)"
                                },
                                "WPM_AreaName": {
                                    "type": "string",
                                    "description": "ชื่อสถานที่ปฏิบัติงานหลัก(plant)"
                                },
                                "WPM_SubAreaID": {
                                    "type": "string",
                                    "description": "รหัสสถานที่ปฏิบัติงานย่อย(อาคาร)",
                                },
                                "WPM_SubAreaName": {
                                    "type": "string",
                                    "description": "ชื่อสถานที่ปฏิบัติงานย่อย(อาคาร)",
                                },
                                "Lat": {
                                    "type": "string",
                                    "description": "พิกัด Latitude ของบุคคล",
                                    "default": "18.33444",

                                },
                                "Long": {
                                    "type": "string",
                                    "description": "พิกัด Longtitude ของบุคคล",
                                    "default": "20.23112",

                                },
                                "WorkStartDate": {
                                    "type": "string",
                                    "description": "วันที่เริ่มต้นการปฎิบัติงาน",
                                    "default": "2022-05-15",

                                },
                                "WorkEndDate": {
                                    "type": "string",
                                    "description": "วันที่สิ้นสุดการปฎิบัติงาน",
                                    "default": "2022-06-30",

                                },
                                "WorkStartTime": {
                                    "type": "string",
                                    "description": "เวลาเริ่มต้นการปฏิบัติงาน",
                                    "default": "08:00",

                                },
                                "WorkEndTime": {
                                    "type": "string",
                                    "description": "เวลาสิ้นสุดการปฏิบัติงาน",
                                    "default": "17:00",

                                },
                                "CompanyID": {
                                    "type": "string",
                                    "description": "รหัสบริษัท",
                                    "default": "3000xxx",

                                },
                                "CompanyName": {
                                    "type": "string",
                                    "description": "ชื่อบริษัท",
                                    "default": "Safety Service Co., Ltd.",

                                },
                                "PTTStaffID": {
                                    "type": "string",
                                    "description": "รหัสผู้ควบคุมงาน",
                                    "default": "1000xxx",

                                },
                                "PTTStaffName": {
                                    "type": "string",
                                    "description": "ชื่อผู้ควบคุมงาน",
                                    "default": "สุรชัย ทองดี",

                                },
                                "AgencyID": {
                                    "type": "string",
                                    "description": "รหัสหน่วยงานผู้ควบคุม",
                                    "default": "4000xxx",

                                },
                                "AgencyName": {
                                    "type": "string",
                                    "description": "ชื่อหน่วยงานผู้ควบคุม",
                                    "default": "หน่วยงาน ปภ.ผยก.",

                                },
                                "OwnerID": {
                                    "type": "string",
                                    "description": "รหัสเจ้าของพื้นที่",
                                    "default": "2000xxx",

                                },
                                "OwnerName": {
                                    "type": "string",
                                    "description": "ชื่อเจ้าของพื้นที่",
                                    "default": "อารีย์ โอบอ้อม",

                                },
                                "WorkpermitType": {
                                    "type": "string",
                                    "description": "ประเภทของ work",
                                    "default": "Scaffolding Permit",

                                },
                                "WorkPermitStatusID": {
                                    "type": "string",
                                    "description": "รหัสสถานะใบงาน",
                                    "default": "W07",

                                },
                                "WorkPermitStatus": {
                                    "type": "string",
                                    "description": "สถานะใบงาน",
                                    "default": "Waiting for Close (Allower)",

                                },
                                "WarningStatusID": {
                                    "type": "array", "items": {
                                        "type": "string",
                                    },
                                    "description": "รหัสสถานะแจ้งเตือน",
                                    "default": ["02"]
                                },
                                "WarningStatus": {
                                    "type": "array", "items": {
                                        "type": "string",
                                    },
                                    "description": "สถานะแจ้งเตือน",
                                    "default": ["อยู่นอกพื้นทีทํางาน"]

                                },
                                "WarningStatusDateTime": {
                                    "type": "array", "items": {
                                        "type": "string",
                                    },
                                    "description": "วันเวลาแจ้งเตือน",
                                    "default": ["2022-06-30 08:00:00"]

                                },
                                "isEmail": {
                                    "type": "boolean",
                                    "description": "true/false",
                                    "default": true
                                },
                                "Email_Event": {
                                    "type": "string",
                                    "description": "รายละเอียด Email และชื่อบุคคลที่ได้รับอีเมลแจ้งเตือน\r\n\"เหตุการณ์\" \"ชื่อผู้รับผิดชอบ\" \"เบอร์โทรศัพท์\""
                                },
                                "isEmailRepeat": {
                                    "type": "boolean",
                                    "description": "true/false",
                                    "default": true
                                },
                                "EmailEventRepeat": {
                                    "type": "string",
                                    "description": "รายละเอียด Email และชื่อบุคคลที่ได้รับอีเมลแจ้งเตือน\r\n\"เหตุการณ์\" \"ชื่อหัวหน้าผู้รับผิดชอบ\" \"เบอร์โทรศัพท์\""
                                }

                            }
                        }
                    }

                }
            ],
            "responses": {},
            "security": [
                {
                    "Bearer": []
                }
            ]
        }
    },
    "/api/webhook/peoplerestrict": {
        "post": {
            "x-swagger-router-controller": "webhook/peoplerestrict",
            "tags": [
                "WEBHOOK"
            ],
            "description": "รับข้อมูลสถานที่ห้ามเข้าของบุคคลแบบ Realtime  จากระบบ People Motion Tracking",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": [
                                "RestrictedAreaID",
                                "RestrictedAreaName",
                                "RestrictedArea"
                            ],
                            "properties": {
                                "RestrictedAreaID": {
                                    "type": "string",
                                    "description": "รหัสสถานที่ห้ามเข้า",
                                    "default": "X001",

                                },
                                "RestrictedAreaName": {
                                    "type": "string",
                                    "description": "ชื่อสถานที่ห้ามเข้า"

                                },
                                "RestrictedArea": {
                                    "type": "object",
                                    "description": "พิกัดสถานที่ห้ามเข้า",
                                    "default": {
                                        "type": "Feature",
                                        "properties": {
                                            "centroid": [101.14686772227287, 12.722390027874555]
                                        },
                                        "geometry": {
                                            "type": "Polygon",
                                            "coordinates": [
                                                [
                                                    [
                                                        101.14682078361511,
                                                        12.72237956244667
                                                    ],
                                                    [
                                                        101.14688783884048,
                                                        12.722342933445697
                                                    ],
                                                    [
                                                        101.14692270755768,
                                                        12.72239526058833
                                                    ],
                                                    [
                                                        101.14684760570526,
                                                        12.72244235500748
                                                    ],
                                                    [
                                                        101.14682078361511,
                                                        12.72237956244667
                                                    ]
                                                ]
                                            ]
                                        }
                                    },

                                }

                            }
                        }
                    }

                }
            ],
            "responses": {},
            "security": [
                {
                    "Bearer": []
                }
            ]
        }
    },
})

export default schema