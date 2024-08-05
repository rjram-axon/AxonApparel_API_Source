using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;
namespace AxonApparel.Business
{
  public class GeneralProcessReceiptBusiness:IGeneralProcessReciptBusiness
    {
      IGeneralProcessReceiptRepository repo = new GeneralProcessReceiptRepository();


      public Common.Response<IQueryable<Domain.ProcessReceiptMas>> Getprocess(int cmpid, int cmunitid, string ordtype)
      {
          try
          {
              var ProductWO = repo.Getprocess(cmpid, cmunitid, ordtype);

              return new Response<IQueryable<Domain.ProcessReceiptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
              //return res;
          }
          catch (Exception)
          {
              return new Response<IQueryable<Domain.ProcessReceiptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
          }
      }

      public Common.Response<IQueryable<Domain.ProcessReceiptMas>> Getprocessor()
      {
          try
          {
              var ProductWO = repo.Getprocessor();

              return new Response<IQueryable<Domain.ProcessReceiptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
              //return res;
          }
          catch (Exception)
          {
              return new Response<IQueryable<Domain.ProcessReceiptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
          }
      }

      public Common.Response<IQueryable<Domain.ProcessReceiptMas>> Getwrkdiv()
      {
          try
          {
              var ProductWO = repo.Getwrkdiv();

              return new Response<IQueryable<Domain.ProcessReceiptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
              //return res;
          }
          catch (Exception)
          {
              return new Response<IQueryable<Domain.ProcessReceiptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
          }
      }

      public Common.Response<IQueryable<Domain.ProcessReceiptMas>> Getissueno(int cmpid, int cmunitid, int processid, int processorid)
      {
          try
          {
              var ProductWO = repo.Getissueno(cmpid, cmunitid, processid, processorid);

              return new Response<IQueryable<Domain.ProcessReceiptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
              //return res;
          }
          catch (Exception)
          {
              return new Response<IQueryable<Domain.ProcessReceiptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
          }
      }

      public Common.Response<IQueryable<Domain.ProcessReceiptMas>> Loadcolor(int cmpid, int cmunitid, int processid, int processorid)
      {
          try
          {
              var ProductWO = repo.Loadcolor(cmpid, cmunitid, processid, processorid);

              return new Response<IQueryable<Domain.ProcessReceiptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
              //return res;
          }
          catch (Exception)
          {
              return new Response<IQueryable<Domain.ProcessReceiptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
          }
      }

      public Common.Response<IQueryable<Domain.ProcessReceiptMas>> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, string ordtype, string closed)
      {
          try
          {
              var ProductWO = repo.Loadaddgrid(cmpid, cmunitid, processid, processorid, ordtype, closed);

              return new Response<IQueryable<Domain.ProcessReceiptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
              //return res;
          }
          catch (Exception)
          {
              return new Response<IQueryable<Domain.ProcessReceiptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
          }
      }


      public Response<IQueryable<Domain.ProcessReceiptDet>> LoadItmgrid(string pid)
      {
          try
          {
              var ProductWO = repo.LoadItmgrid(pid);

              return new Response<IQueryable<Domain.ProcessReceiptDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
              //return res;
          }
          catch (Exception)
          {
              return new Response<IQueryable<Domain.ProcessReceiptDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
          }
      }

      public Response<IQueryable<Domain.ProcessReceiptJobdet>> Loadjobdetgrid(string pid)
      {
          try
          {
              var ProductWO = repo.Loadjobdetgrid(pid);

              return new Response<IQueryable<Domain.ProcessReceiptJobdet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
              //return res;
          }
          catch (Exception)
          {
              return new Response<IQueryable<Domain.ProcessReceiptJobdet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
          }
      }


      public Response<bool> CreateUnitEntry(Domain.ProcessReceiptMas MasEntry)
      {
          try
          {
                AxonApparel.Repository.Process_Recpt_Mas ProcInsert = new AxonApparel.Repository.Process_Recpt_Mas
              //var ID = repo.AddData(new AxonApparel.Repository.Process_Recpt_Mas
              {
                  proc_recpt_masid = MasEntry.proc_recpt_masid,
                  proc_recpt_no = MasEntry.proc_recpt_no,
                  proc_recpt_date = MasEntry.proc_recpt_date,
                  Recpt_Ref_date = MasEntry.Recpt_Ref_date,
                  Recpt_Ref_no = MasEntry.Recpt_Ref_no,
                  remarks = MasEntry.remarks,
                  OrderType = MasEntry.OrderType,
                  StoreUnitID = MasEntry.StoreUnitID,
                  CreatedBy = MasEntry.CreatedBy,
                  InwardNo = MasEntry.InwardNo,
                  SupplierInvoiceNo = MasEntry.SupplierInvoiceNo,
                  ExcldetoInv = MasEntry.ExcldetoInv,
                  InspDate = MasEntry.InspDate,
                  InspNo = MasEntry.InspNo,
                  EWayDate = MasEntry.EWayDate,
                  EWayNo = MasEntry.EWayNo

              };

              var ItmList = new List<Process_Recpt_Det>();

              foreach (var PItem in MasEntry.ProcDet)
              {
                  ItmList.Add(new Process_Recpt_Det
                  {

                      itemid = PItem.itemid,
                      colorid = PItem.colorid,
                      sizeid = PItem.sizeid,
                      rate = PItem.rate,
                      Proc_Recpt_Detid = PItem.Proc_Recpt_Detid,
                      Proc_Recpt_Masid = PItem.Proc_Recpt_Masid,
                      ProcessOrdId = PItem.ProcessOrdId,
                      Received_qty = PItem.Received_qty,
                      Sec_Qty = PItem.Sec_Qty,
                      Invoice_Qty = PItem.Invoice_Qty,
                      closed = PItem.closed,
                      IPMarkup_rate = PItem.IPMarkup_rate,
                      OPMarkup_Rate = PItem.OPMarkup_Rate,
                      IssuedSizeID = PItem.IssuedSizeID,
                      WasQty = PItem.WasQty,
                      ProcessOrdDetid = PItem.ProcessOrdDetid,



                  });

              }

              var ItmstkList = new List<Process_Recpt_Jobdet>();

              foreach (var stk in MasEntry.ProcJobDet)
              {
                  ItmstkList.Add(new Process_Recpt_Jobdet
                  {
                      Proc_Recpt_Masid = stk.Proc_Recpt_Masid,
                      Proc_Recpt_Detid = stk.Proc_Recpt_Detid,
                      Proc_Recpt_JobDetid = stk.Proc_Recpt_JobDetid,
                      ProdPrgNo = "",//stk.ProdPrgNo,
                      Job_Ord_No = "",//stk.Job_Ord_No,
                      LotNo = "",//stk.LotNo,
                      IssLot = "",//stk.IssLot,
                      Itemid = stk.Itemid,
                      Colorid = stk.Colorid,
                      Sizeid = stk.Sizeid,
                      ProcessOrdDetid = stk.ProcessOrdDetid,
                      ProcessOrdJobDetid = stk.ProcessOrdJobDetid,
                      Received_Qty = stk.Received_Qty,
                      Sec_Qty = stk.Sec_Qty,
                      DisRowId = stk.DisRowId,
                      LotRowid = stk.LotRowid,


                  });

              }


              var result = repo.AddDetData(ProcInsert,MasEntry.proc_recpt_no, ItmList, ItmstkList, "Add");

              return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
              // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
          }
          catch (Exception)
          {
              return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

          }
      }


      public Response<IQueryable<Domain.ProcessReceiptMas>> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string jobordno, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int processorid)
      {
          try
          {
              var ProductWO = repo.LoadMaingrid(cmpid, processid, unitid, buyerid, masid, prodordid, jobordno, processortype, type, dcno, recptno, fromdate, todate, processorid);

              return new Response<IQueryable<Domain.ProcessReceiptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
              //return res;
          }
          catch (Exception)
          {
              return new Response<IQueryable<Domain.ProcessReceiptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
          }
      }


      public Response<IQueryable<Domain.ProcessReceiptDet>> LoadEditItmgrid(int pid)
      {
          try
          {
              var ProductWO = repo.LoadEditItmgrid(pid);

              return new Response<IQueryable<Domain.ProcessReceiptDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
              //return res;
          }
          catch (Exception)
          {
              return new Response<IQueryable<Domain.ProcessReceiptDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
          }
      }

      public Response<IQueryable<Domain.ProcessReceiptJobdet>> LoadEditjobdetgrid(int pid)
      {
          try
          {
              var ProductWO = repo.LoadEditjobdetgrid(pid);

              return new Response<IQueryable<Domain.ProcessReceiptJobdet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
              //return res;
          }
          catch (Exception)
          {
              return new Response<IQueryable<Domain.ProcessReceiptJobdet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
          }
      }

      public Response<IQueryable<Domain.ProcessReceiptDet>> ChkDC(string recpt, int pid)
      {
          try
          {
              var ProductWO = repo.ChkDC(recpt, pid);

              return new Response<IQueryable<Domain.ProcessReceiptDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
              //return res;
          }
          catch (Exception)
          {
              return new Response<IQueryable<Domain.ProcessReceiptDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
          }
      }


      public Response<bool> DeleteDelEntry(Domain.ProcessReceiptMas DelDEntry)
      {
          var List = new List<Process_Recpt_Mas>();

          //foreach (var PItem in DelDEntry.ProdDet)
          //{
          List.Add(new Process_Recpt_Mas
          {

              proc_recpt_masid = DelDEntry.proc_recpt_masid,
              proc_recpt_no = DelDEntry.proc_recpt_no,
              proc_recpt_date = DelDEntry.proc_recpt_date,
              Recpt_Ref_date = DelDEntry.Recpt_Ref_date,
              Recpt_Ref_no = DelDEntry.Recpt_Ref_no,
              remarks = DelDEntry.remarks,
              OrderType = DelDEntry.OrderType,
              StoreUnitID = DelDEntry.StoreUnitID,
              CreatedBy = DelDEntry.CreatedBy,



          });

          //}




          var ItmList = new List<Process_Recpt_Det>();

          foreach (var PItem in DelDEntry.ProcDet)
          {
              ItmList.Add(new Process_Recpt_Det
              {

                  itemid = PItem.itemid,
                  colorid = PItem.colorid,
                  sizeid = PItem.sizeid,
                  rate = PItem.rate,
                  Proc_Recpt_Detid = PItem.Proc_Recpt_Detid,
                  Proc_Recpt_Masid = PItem.Proc_Recpt_Masid,
                  ProcessOrdId = PItem.ProcessOrdId,
                  Received_qty = PItem.Received_qty,
                  Sec_Qty = PItem.Sec_Qty,
                  Invoice_Qty = PItem.Invoice_Qty,
                  closed = PItem.closed,
                  IPMarkup_rate = PItem.IPMarkup_rate,
                  OPMarkup_Rate = PItem.OPMarkup_Rate,
                  IssuedSizeID = PItem.IssuedSizeID,
                  WasQty = PItem.WasQty



              });

          }

          var ItmstkList = new List<Process_Recpt_Jobdet>();

          foreach (var stk in DelDEntry.ProcJobDet)
          {
              ItmstkList.Add(new Process_Recpt_Jobdet
              {
                  Proc_Recpt_Masid = stk.Proc_Recpt_Masid,
                  Proc_Recpt_Detid = stk.Proc_Recpt_Detid,
                  Proc_Recpt_JobDetid = stk.Proc_Recpt_JobDetid,
                  ProdPrgNo = stk.ProdPrgNo,
                  Job_Ord_No = stk.Job_Ord_No,
                  LotNo = "",//stk.LotNo,
                  IssLot = "",//stk.IssLot,
                  Itemid = stk.Itemid,
                  Colorid = stk.Colorid,
                  Sizeid = stk.Sizeid,
                  ProcessOrdDetid = stk.ProcessOrdDetid,
                  ProcessOrdJobDetid = stk.ProcessOrdJobDetid,
                  Received_Qty = stk.Received_Qty,
                  Sec_Qty = stk.Sec_Qty,
                  DisRowId = stk.DisRowId,
                  LotRowid = stk.LotRowid,


              });

          }

          var str = "";
          var result = repo.DeleteDetData(DelDEntry.proc_recpt_no, ItmList, ItmstkList, "");

          return new Response<bool>(result, Status.SUCCESS, "Deleted Successfully");
      }

      public Response<bool> UpdateData(Domain.ProcessReceiptMas objupd)
      {
          try
          {
              AxonApparel.Repository.Process_Recpt_Mas ProcUpd = new AxonApparel.Repository.Process_Recpt_Mas

              //var ID = repo.UpdateData(new AxonApparel.Repository.Process_Recpt_Mas
              {
                  proc_recpt_masid = objupd.proc_recpt_masid,
                  proc_recpt_no = objupd.proc_recpt_no,
                  proc_recpt_date = objupd.proc_recpt_date,
                  Recpt_Ref_date = objupd.Recpt_Ref_date,
                  Recpt_Ref_no = objupd.Recpt_Ref_no,
                  remarks = objupd.remarks,
                  OrderType = objupd.OrderType,
                  StoreUnitID = objupd.StoreUnitID,
                  CreatedBy = objupd.CreatedBy,
                  InwardNo = objupd.InwardNo,
                  SupplierInvoiceNo = objupd.SupplierInvoiceNo,
                  ExcldetoInv = objupd.ExcldetoInv,
                  InspDate = objupd.InspDate,
                  InspNo = objupd.InspNo,
                  EWayDate = objupd.EWayDate,
                  EWayNo = objupd.EWayNo

              };

              var ItmList = new List<Process_Recpt_Det>();

              foreach (var PItem in objupd.ProcDet)
              {
                  ItmList.Add(new Process_Recpt_Det
                  {

                      itemid = PItem.itemid,
                      colorid = PItem.colorid,
                      sizeid = PItem.sizeid,
                      rate = PItem.rate,
                      Proc_Recpt_Detid = PItem.Proc_Recpt_Detid,
                      Proc_Recpt_Masid = PItem.Proc_Recpt_Masid,
                      ProcessOrdId = PItem.ProcessOrdId,
                      Received_qty = PItem.Received_qty,
                      Sec_Qty = PItem.Sec_Qty,
                      Invoice_Qty = PItem.Invoice_Qty,
                      closed = PItem.closed,
                      IPMarkup_rate = PItem.IPMarkup_rate,
                      OPMarkup_Rate = PItem.OPMarkup_Rate,
                      IssuedSizeID = PItem.IssuedSizeID,
                      WasQty = PItem.WasQty,
                      ProcessOrdDetid = PItem.ProcessOrdDetid,



                  });

              }

              var ItmstkList = new List<Process_Recpt_Jobdet>();

              foreach (var stk in objupd.ProcJobDet)
              {
                  ItmstkList.Add(new Process_Recpt_Jobdet
                  {
                      Proc_Recpt_Masid = stk.Proc_Recpt_Masid,
                      Proc_Recpt_Detid = stk.Proc_Recpt_Detid,
                      Proc_Recpt_JobDetid = stk.Proc_Recpt_JobDetid,
                      ProdPrgNo = "",//stk.ProdPrgNo,
                      Job_Ord_No = "",//stk.Job_Ord_No,
                      LotNo = "",//stk.LotNo,
                      IssLot = "",//stk.IssLot,
                      Itemid = stk.Itemid,
                      Colorid = stk.Colorid,
                      Sizeid = stk.Sizeid,
                      ProcessOrdDetid = stk.ProcessOrdDetid,
                      ProcessOrdJobDetid = stk.ProcessOrdJobDetid,
                      Received_Qty = stk.Received_Qty,
                      Sec_Qty = stk.Sec_Qty,
                      DisRowId = stk.DisRowId,
                      LotRowid = stk.LotRowid,


                  });

              }


              var result = repo.UpdDetData(ProcUpd,objupd.proc_recpt_no, ItmList, ItmstkList, "Update");

              return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
              // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
          }
          catch (Exception)
          {
              return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

          }
      }
    }
}
