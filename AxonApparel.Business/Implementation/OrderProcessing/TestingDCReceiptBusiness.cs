using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
    public class TestingDCReceiptBusiness : ITestingDCReceiptBusiness
    {
        private ITestingDCReceiptRepository strrep = new TestingDCReceiptRepository();

        public Response<IQueryable<AxonApparel.Domain.TestingDCReceiptMas>> GetTestingDCReceipt()
        {
            try
            {
                var strlist = strrep.GetDataList();

                return new Response<IQueryable<Domain.TestingDCReceiptMas>>(strlist.Select(m => new Domain.TestingDCReceiptMas
                {
                    TestingDCReceiptId=m.TestingDCReceiptId,
                    DCReceiptNo=m.DCReceiptNo,
                    DCReceiptDate=(DateTime)m.DCReceiptDate,
                    TestingDCId = m.TestingDCId,
                    TestingDCNo=m.TestingDCMas.DCNo,
                    SupplierId = (int)m.SupplierId,
                    Supplier = m.Supplier.Supplier1,
                    OrderId = (int)m.OrderId,
                    OrderNo = m.Buy_Ord_Mas.Order_No,
                    OrderRefNo=m.OrderRefNo,
                    BillNo=m.BillNo,
                    BillDate = (DateTime)m.BillDate,
                    Remarks=m.Remarks,
                    GSTTaxID=(int)m.GSTtaxId,
                    TestValue=(decimal)m.TestValue,
                    CGSTPer = (decimal)m.CGST_Per,
                    CGSTValue = (decimal)m.CGSTValue,
                    SGSTPer = (decimal)m.SGST_Per,
                    SGSTValue = (decimal)m.SGSTValue,
                    IGSTPer = (decimal)m.IGST_Per,
                    IGSTValue = (decimal)m.IGSTValue,
                    TotalValue = (decimal)m.TotalValue,
                    CreatedBy=(int)m.CreatedBy
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.TestingDCReceiptMas>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<bool> CreateTestingDCReceipt(Domain.TestingDCReceiptMas tstDCobj)
        {
            try
            {
                AxonApparel.Repository.TestingDCReceiptMas TestingDCMasInsert = new AxonApparel.Repository.TestingDCReceiptMas
                {
                    DCReceiptNo = tstDCobj.DCReceiptNo,
                    DCReceiptDate = tstDCobj.DCReceiptDate,
                    TestingDCId = tstDCobj.TestingDCId,
                    SupplierId = tstDCobj.SupplierId,
                    CompanyId=tstDCobj.CompanyId,
                    OrderRefNo = tstDCobj.OrderRefNo,
                    TestValue = tstDCobj.TestValue,
                    BillNo = tstDCobj.BillNo,
                    BillDate = tstDCobj.BillDate,
                    CreatedBy = tstDCobj.CreatedBy,
                    OrderId = tstDCobj.OrderId,
                    GSTtaxId = tstDCobj.GSTTaxID,
                    CGST_Per = tstDCobj.CGSTPer,
                    CGSTValue = tstDCobj.CGSTValue,
                    SGST_Per = tstDCobj.SGSTPer,
                    SGSTValue = tstDCobj.SGSTValue,
                    IGST_Per = tstDCobj.IGSTPer,
                    IGSTValue = tstDCobj.IGSTValue,
                    TotalValue = tstDCobj.TotalValue,
                    Remarks = tstDCobj.Remarks,
                    PA="P"
                };

                var testingDCDet = new List<Repository.TestingDCReceiptDet>();

                if (tstDCobj.Testing_DC_Receipt_det != null)
                {
                    foreach (var SamTypelst in tstDCobj.Testing_DC_Receipt_det)
                    {
                        testingDCDet.Add(new Repository.TestingDCReceiptDet
                        {
                            SeqNo = SamTypelst.SeqNo,
                            TestingTypeId = SamTypelst.TestingTypeId,
                            TestPcs = SamTypelst.TestPcs,
                            RatePerPcs = SamTypelst.RatePerPcs,
                            Value = SamTypelst.Value,
                            StatusId = SamTypelst.StatusId
                        });
                    }
                }

                var result = strrep.AddData(TestingDCMasInsert, testingDCDet);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> Update(Domain.TestingDCReceiptMas obj)
        {
            try
            {
                var ItmList = new List<Repository.TestingDCReceiptDet>();

                foreach (var PItem in obj.Testing_DC_Receipt_det)
                {
                    ItmList.Add(new Repository.TestingDCReceiptDet
                    {
                        TestingDCReceiptId = PItem.DCReceiptId,
                        SeqNo = PItem.SeqNo,
                        TestingTypeId = PItem.TestingTypeId,
                        TestPcs = PItem.TestPcs,
                        RatePerPcs = PItem.RatePerPcs,
                        Value = PItem.Value,
                        StatusId = PItem.StatusId
                    });
                }

                var TMID = strrep.UpdateData(new AxonApparel.Repository.TestingDCReceiptMas
                {
                    TestingDCReceiptId=obj.TestingDCReceiptId,
                    TestingDCId = obj.TestingDCId,
                    SupplierId = obj.SupplierId,
                    CompanyId=obj.CompanyId,
                    DCReceiptNo = obj.DCReceiptNo,
                    DCReceiptDate = obj.DCReceiptDate,                    
                    OrderRefNo = obj.OrderRefNo,
                    TestValue = obj.TestValue,
                    BillNo = obj.BillNo,
                    BillDate = obj.BillDate,
                    CreatedBy = obj.CreatedBy,
                    OrderId = obj.OrderId,
                    GSTtaxId = obj.GSTTaxID,
                    CGST_Per = obj.CGSTPer,
                    CGSTValue = obj.CGSTValue,
                    SGST_Per = obj.SGSTPer,
                    SGSTValue = obj.SGSTValue,
                    IGST_Per = obj.IGSTPer,
                    IGSTValue = obj.IGSTValue,
                    TotalValue = obj.TotalValue,
                    Remarks = obj.Remarks,
                    ModifyBy = obj.ModifyBy,
                    ModifyDate = DateTime.Now
                }, ItmList);

                if (TMID)
                {
                    //var result = stkRep.AddDetData(ItmList, yarnList, processList, bomList, cmtList, commList, "Update");
                    return new Response<bool>(true, Status.SUCCESS, "Updated Successfully");
                }
                else
                {
                    return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
                }
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        
        public Response<bool> Delete(int id)
        {
            return new Response<bool>(strrep.DeleteData(id), Status.SUCCESS, "Deleted Successfully");
        }

        public Response<AxonApparel.Domain.TestingDCReceiptMas> GetTestingDCReceiptId(int TestingDCRecptId)
        {
            try
            {
                var str = strrep.GetDataById(TestingDCRecptId);
                return new Response<Domain.TestingDCReceiptMas>(new Domain.TestingDCReceiptMas
                {
                    TestingDCReceiptId=str.TestingDCReceiptId,
                    DCReceiptNo=str.DCReceiptNo,
                    DCReceiptDate=(DateTime)str.DCReceiptDate,
                    TestingDCId = str.TestingDCId,
                    TestingDCNo=str.TestingDCMas.DCNo,
                    SupplierId = (int)str.SupplierId,
                    CompanyId=(int)str.CompanyId,
                    Supplier = str.Supplier.Supplier1,
                    OrderId = (int)str.OrderId,
                    OrderNo = str.Buy_Ord_Mas.Order_No,
                    OrderRefNo=str.OrderRefNo,
                    BillNo=str.BillNo,
                    BillDate = (DateTime)str.BillDate,
                    Remarks=str.Remarks,
                    GSTTaxID=(int)str.GSTtaxId,
                    TestValue=(decimal)str.TestValue,
                    CGSTPer = (decimal)str.CGST_Per,
                    CGSTValue = (decimal)str.CGSTValue,
                    SGSTPer = (decimal)str.SGST_Per,
                    SGSTValue = (decimal)str.SGSTValue,
                    IGSTPer = (decimal)str.IGST_Per,
                    IGSTValue = (decimal)str.IGSTValue,
                    TotalValue = (decimal)str.TotalValue,
                    CreatedBy=(int)str.CreatedBy,

                    Testing_DC_Receipt_det = str.TestingDCReceiptDet.Select(h => new Domain.TestingDCReceiptDet()
                    {
                        DCReceiptDetId = (int)h.TestingDCReceiptDetId,  
                        DCReceiptId=str.TestingDCReceiptId,
                        SeqNo = h.SeqNo,
                        TestingType = h.TestingType.TestingType1,
                        TestingTypeId = (int)h.TestingTypeId,
                        TestPcs = (int)h.TestPcs,
                        RatePerPcs = (decimal)h.RatePerPcs,
                        Value = (decimal)h.Value,
                        StatusId = h.StatusId
                    }).Where(x => x.DCReceiptId == TestingDCRecptId).ToList(),

                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.TestingDCReceiptMas>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }
    }
}
