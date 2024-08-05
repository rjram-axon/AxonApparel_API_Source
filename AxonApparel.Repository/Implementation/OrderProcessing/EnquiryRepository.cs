using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;


namespace AxonApparel.Repository
{
    public class EnquiryRepository : IEnquiryRepository
    {
        OrderEntities entities = new OrderEntities();

        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

        public IQueryable<Enquiry> GetDataList(int? companyId, string EntryNo, int? BuyerID, int? StyleId, string fromDate, string toDate)
        {

            
                IQueryable<Enquiry> query = (from cdm in entities.Proc_Apparel_GetEnquiryMainDetails(companyId == null ? 0 : companyId, string.IsNullOrEmpty(EntryNo) ? "" : EntryNo, BuyerID == null ? 0 : BuyerID, StyleId == null ? 0 : StyleId, fromDate == null ? "" : fromDate.ToString(), toDate == null ? "" : toDate.ToString())
                                             select new Enquiry
                                                      {

                                                          EnquiryId = cdm.EnquiryId,
                                                          EnquiryNo = cdm.EnquiryNo,
                                                          EnqDate = (DateTime)cdm.EnqDate,
                                                          Buyer = cdm.Buyer,
                                                          Style = cdm.Style,
                                                          BuyerRef = cdm.BuyerRef,


                                                      }).AsQueryable();
                return query;
          
        }

        public MarkEnqMas GetDataById(int id)
        {
            //return entities.MarkEnqMas.Where(c => c.EnquiryId == id).FirstOrDefault();

            MarkEnqMas employee = new MarkEnqMas();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from MarkEnqMas where EnquiryId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    employee.EnquiryId = Convert.ToInt32(rdr["EnquiryId"]);
                    employee.CompanyId = Convert.ToInt32(rdr["CompanyId"]);
                    employee.BuyerId = Convert.ToInt32(rdr["BuyerId"]);
                    employee.TermsId = Convert.ToInt32(rdr["TermsId"]);
                    employee.ShipSystemId = Convert.ToInt32(rdr["ShipSystemId"]);
                    employee.SeasonId = Convert.ToInt32(rdr["SeasonId"]);
                    employee.CreatedBy = Convert.ToInt32(rdr["CreatedBy"]);
                    employee.EnquiryNo = rdr["EnquiryNo"].ToString();
                    employee.BuyerRef = rdr["BuyerRef"].ToString();
                    employee.Remarks = rdr["Remarks"].ToString();
                    employee.Despatched_closed = rdr["Despatched_closed"].ToString();
                    employee.Sampling = rdr["Sampling"].ToString();
                    employee.Ordered = rdr["Ordered"].ToString();
                    employee.Status = rdr["Status"].ToString();
                    employee.EnqDate = Convert.ToDateTime(rdr["EnqDate"]);
                    employee.RefDate = Convert.ToDateTime(rdr["RefDate"]);
                    employee.DespDate = Convert.ToDateTime(rdr["DespDate"]);
                    employee.MarkEnqStyle = entities.MarkEnqStyle.Where(e => e.EnquiryID == id).ToList();
                    employee.MarkEnqItemDet = entities.MarkEnqItemDet.Where(e => e.EnquiryId == id).ToList();
                    employee.MarkEnqFabric = entities.MarkEnqFabric.Where(e => e.EnquiryID == id).ToList();
                    employee.MarkEnqEmbPrint = entities.MarkEnqEmbPrint.Where(e => e.EnquiryID == id ).ToList();
                    
                }
            }
            return employee; 
        }

        public int AddData(MarkEnqMas objenq)
        {
            var id = entities.MarkEnqMas.Add(objenq);
            entities.SaveChanges();
            return id.EnquiryId;
        }

        public bool UpdateData(MarkEnqMas objen)
        {
            var result = false;

            var App = entities.MarkEnqMas.Where(c => c.EnquiryId == objen.EnquiryId).FirstOrDefault();
            if (App != null)
            {
                App.EnquiryId = objen.EnquiryId;
                App.EnquiryNo = objen.EnquiryNo;
                App.EnqDate = objen.EnqDate;
                App.CompanyId = objen.CompanyId;
                App.BuyerId = objen.BuyerId;
                App.BuyerRef = objen.BuyerRef;
                App.RefDate = objen.RefDate;
                App.TermsId = objen.TermsId;
                App.DespDate = objen.DespDate;
                App.Remarks = objen.Remarks;
                App.Despatched_closed = objen.Despatched_closed;
                App.Sampling = objen.Sampling;
                App.Ordered = objen.Ordered;
                App.Status = objen.Status;
                App.ShipSystemId = objen.ShipSystemId;
                App.SeasonId = objen.SeasonId;
                App.CreatedBy = objen.CreatedBy;
            }
            entities.SaveChanges();
            result = true;
            return result;
        }
        public bool UpdateStyleData(MarkEnqStyle objSty)
        {
            var result = false;

            var App = entities.MarkEnqStyle.Where(c => c.EnquiryID == objSty.EnquiryID).FirstOrDefault();
            if (App != null)
            {
                //App.EnquiryStyleId = objen.EnquiryStyleId;
                App.StyleId = objSty.StyleId;
                App.BuyerStyle = objSty.BuyerStyle;
                App.StyleDesc = objSty.StyleDesc;
                App.QuotaCateId = objSty.QuotaCateId;
                App.Quantity = objSty.Quantity;
                App.GUomId = objSty.GUomId;
                App.GUomConv = objSty.GUomConv;
                App.ContactPerson = objSty.ContactPerson;
                App.ShipModeId = objSty.ShipModeId;
                App.Department = objSty.Department;
                App.Season = objSty.Season;
            }
            entities.SaveChanges();
            result = true;
            return result;
        }
        public bool UpdateEmbData(List<MarkEnqEmbPrint> objEmbDet)
        {

            var result = false;

            foreach (var i in objEmbDet)
            {
                if (i.MarkEnqEmbPrintId != 0)
                {
                    var c = entities.MarkEnqEmbPrint.Where(a => a.MarkEnqEmbPrintId.Equals(i.MarkEnqEmbPrintId)).FirstOrDefault();
                    if (c != null)
                    {
                        //c.MarkEnqEmbPrintId = i.MarkEnqEmbPrintId;
                        c.EmbDesc = i.EmbDesc;
                        c.EmbSize = i.EmbSize;
                        c.EmbPlacement = i.EmbPlacement;
                        c.EmbColors = i.EmbColors;
                        c.EmbStiches = i.EmbStiches;
                        c.EmbType = i.EmbType;
                        c.PrnDesc = i.PrnDesc;
                        c.PrnSize = i.PrnSize;
                        c.PrnPlacement = i.PrnPlacement;
                        c.PrnColors = i.PrnColors;
                        c.PrnType = i.PrnType;
                        c.PrnQlty = i.PrnQlty;
                        c.EmbNo = i.EmbNo;
                        c.PrnNo = i.PrnNo;
                        c.EmbImage = i.EmbImage;
                        c.PrintImage = i.PrintImage;
                        c.Emb_or_Prn = "E";
                    }
                }
                
            }

            entities.SaveChanges();
            result = true;
            return result;
        }

        public bool UpdateItemData(List<MarkEnqItemDet> objItemDet)
        {

            var result = false;

            foreach (var i in objItemDet)
            {
                var c = entities.MarkEnqItemDet.Where(a => a.MarkEnqItemId.Equals(i.MarkEnqItemId)).FirstOrDefault();
                if (c != null)
                {
                    //c.MarkEnqItemId = i.MarkEnqItemId;
                    c.ColorId = i.ColorId;
                    c.SizeId = i.SizeId;
                    c.UomId = i.UomId;
                    c.Quantity = i.Quantity;
                    c.DespatchQty = i.DespatchQty;
                }
            }

            entities.SaveChanges();
            result = true;
            return result;
        }
        public bool UpdateFabricData(List<MarkEnqFabric> objFabricDet)
        {

            var result = false;

            foreach (var i in objFabricDet)
            {
                var c = entities.MarkEnqFabric.Where(a => a.MarkEnqFabricId.Equals(i.MarkEnqFabricId)).FirstOrDefault();
                if (c != null)
                {
                    // c.MarkEnqFabricId = i.MarkEnqFabricId;
                    c.FabricId = i.FabricId;
                    c.ColorId = i.ColorId;
                    c.SizeId = i.SizeId;
                    c.GSM = i.GSM;
                    c.Composition = i.Composition;
                    c.FabDesc = i.FabDesc;
                    c.Counts = i.Counts;
                }
            }

            entities.SaveChanges();
            result = true;
            return result;
        }
        public bool UpdatePrintData(List<MarkEnqEmbPrint> objPrintDet)
        {

            var result = false;

            foreach (var i in objPrintDet)
            {
                if (i.MarkEnqEmbPrintId != 0)
                {
                    var c = entities.MarkEnqEmbPrint.Where(a => a.MarkEnqEmbPrintId.Equals(i.MarkEnqEmbPrintId)).FirstOrDefault();
                    if (c != null)
                    {
                        //c.MarkEnqEmbPrintId = i.MarkEnqEmbPrintId;
                        c.EmbDesc = i.EmbDesc;
                        c.EmbSize = i.EmbSize;
                        c.EmbPlacement = i.EmbPlacement;
                        c.EmbColors = i.EmbColors;
                        c.EmbStiches = i.EmbStiches;
                        c.EmbType = i.EmbType;
                        c.PrnDesc = i.PrnDesc;
                        c.PrnSize = i.PrnSize;
                        c.PrnPlacement = i.PrnPlacement;
                        c.PrnColors = i.PrnColors;
                        c.PrnType = i.PrnType;
                        c.PrnQlty = i.PrnQlty;
                        c.EmbNo = i.EmbNo;
                        c.PrnNo = i.PrnNo;
                        c.EmbImage = i.EmbImage;
                        c.PrintImage = i.PrintImage;
                        c.Emb_or_Prn = "P";
                    }
                }
                
            }

            entities.SaveChanges();
            result = true;
            return result;
        }
        public bool DeleteItem(List<int> Id)
        {
            var result = false;

            foreach (var d in Id)
            {
                var Det = entities.MarkEnqItemDet.Where(u => u.MarkEnqItemId == d);
                foreach (var u in Det)
                {
                    entities.MarkEnqItemDet.Remove(u);
                }
            }
            entities.SaveChanges();
            result = true;
            return result;
        }
        public bool DeleteFabric(List<int> Id)
        {
            var result = false;

            foreach (var d in Id)
            {
                var Det = entities.MarkEnqFabric.Where(u => u.MarkEnqFabricId == d);
                foreach (var u in Det)
                {
                    entities.MarkEnqFabric.Remove(u);
                }
            }
            entities.SaveChanges();
            result = true;
            return result;
        }
        public bool DeleteEmp(List<int> Id)
        {
            var result = false;

            foreach (var d in Id)
            {
                var Det = entities.MarkEnqEmbPrint.Where(u => u.MarkEnqEmbPrintId == d);
                foreach (var u in Det)
                {
                    entities.MarkEnqEmbPrint.Remove(u);
                }
            }
            entities.SaveChanges();
            result = true;
            return result;
        }
        public bool DeletePrinting(List<int> Id)
        {
            var result = false;

            foreach (var d in Id)
            {
                var Det = entities.MarkEnqEmbPrint.Where(u => u.MarkEnqEmbPrintId == d);
                foreach (var u in Det)
                {
                    entities.MarkEnqEmbPrint.Remove(u);
                }
            }
            entities.SaveChanges();
            result = true;
            return result;
        }
        public bool DeleteData(int Id)
        {
            var result = false;
            var Det = entities.MarkEnqItemDet.Where(u => u.EnquiryId == Id);

            foreach (var u in Det)
            {
                entities.MarkEnqItemDet.Remove(u);
            }

            var Det1 = entities.MarkEnqEmbPrint.Where(u => u.EnquiryID == Id);

            foreach (var u in Det1)
            {
                entities.MarkEnqEmbPrint.Remove(u);
            }
            var Det2 = entities.MarkEnqFabric.Where(u => u.EnquiryID == Id);

            foreach (var u in Det2)
            {
                entities.MarkEnqFabric.Remove(u);
            }
            var Det3 = entities.MarkEnqStyle.Where(u => u.EnquiryID == Id);

            foreach (var u in Det3)
            {
                entities.MarkEnqStyle.Remove(u);
            }
            var Mas = entities.MarkEnqMas.Where(c => c.EnquiryId == Id).FirstOrDefault();
            if (Mas != null)
            {
                entities.MarkEnqMas.Remove(Mas);
            }
            entities.SaveChanges();
            result = true;
            return result;
        }


        public int AddStyleData(MarkEnqStyle enqStyle)
        {
            var id = entities.MarkEnqStyle.Add(enqStyle);
            entities.SaveChanges();
            return id.EnquiryStyleId;
        }


        public bool AddItemData(List<MarkEnqItemDet> objCDet)
        {
            
            foreach (var item in objCDet)
            {

                entities.MarkEnqItemDet.Add(item);

            }
            entities.SaveChanges();
            return true;
        }
        public bool AddFabricData(List<MarkEnqFabric> objFDet)
        {
            foreach (var Fabric in objFDet)
            {
                entities.MarkEnqFabric.Add(Fabric);
            }
            entities.SaveChanges();
            return true;
        }
        public bool AddEmbData(List<MarkEnqEmbPrint> objEDet)
        {
            foreach (var Emb in objEDet)
            {
                entities.MarkEnqEmbPrint.Add(Emb);
            }
            entities.SaveChanges();
            return true;
        }

        
        public IQueryable<MarkEnqMas> GetEntryNoDataList()
        {
            return entities.MarkEnqMas.OrderBy(c => c.EnquiryNo);
        }

        public IQueryable<MarkEnqMas> GetBuyRefNoDataList()
        {
            return entities.MarkEnqMas.OrderBy(c => c.EnquiryNo);
        }
    }
}
