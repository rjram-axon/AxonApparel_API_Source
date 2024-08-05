using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class TermTemplateRepository : ITermTemplateRepository
    {

        MasterEntities entities = new MasterEntities();

        public bool AddDetData(List<TermDet> objTDet)
        {

            bool reserved = false;
            int OMasId = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    var OQuery = entities.TermDet.OrderByDescending(x => x.TemplateNameMasId).FirstOrDefault();
                    if (OQuery != null)
                    {
                        OMasId = (int)OQuery.TemplateNameMasId;
                    }

                    foreach (var terms in objTDet)
                    {
                        terms.TemplateNameMasId = OMasId + 1;
                        entities.TermDet.Add(terms);
                    }
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }



        public IQueryable<Terms> GetDataMainList()
        {
            int Masid = 0;
            IQueryable<Terms> query = (from cd in entities.Proc_Apparel_GetTermTempMaindetails(Masid == null ? 0 : Masid)
                                       select new Terms
                                              {

                                                  TermsTempNameId = (int)cd.TemplateNameMasId,
                                                  TermsTempName = cd.TemplateName

                                              }).AsQueryable();
            return query;
        }



        public IQueryable<Terms> GetDataTermRepEditDetails(int Id)
        {
            IQueryable<Terms> query = (from a in entities.Proc_Apparel_GetTermTempMaindetails(Id)
                                       select new Terms
                                               {
                                                   TermsTempName = a.TemplateName,
                                                   TermsTempNameId = (int)a.TemplateNameMasId,

                                               }).AsQueryable();

            return query;
        }


        public IList<Domain.TermDet> GetRepEntryEditItemLoad(int Id)
        {
            var query = (from EID in entities.Proc_Apparel_GetTermTempEditdetails(Id)
                         select new Domain.TermDet
                         {
                             TermDesc = EID.TermDesc,
                             TermsId = (int)EID.Termid,
                             Terms = EID.TermName,
                             TemplateName = EID.TemplateName,
                             TemplateNameId = (int)EID.TemplateNameMasId,
                             TermDetId = EID.TermDetId,
                         }).AsQueryable();

            return query.ToList();
        }


        public bool UpdateDetData(List<TermDet> objUDet)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    foreach (var k in objUDet)
                    {
                        var e = entities.TermDet.Where(a => a.TemplateNameMasId.Equals(k.TemplateNameMasId)).FirstOrDefault();
                        if (e != null)
                        {
                            e.Termid = k.Termid;
                            e.TermDesc = k.TermDesc;
                            e.TermDetId = k.TermDetId;
                            e.TemplateNameMasId = k.TemplateNameMasId;
                            e.TemplateName = k.TemplateName;
                        }
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }

        public bool DeleteDetData(List<TermDet> objDDet)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    foreach (var k in objDDet)
                    {
                        var CDet = entities.TermDet.Where(u => u.TemplateNameMasId == k.TemplateNameMasId);

                        foreach (var v in CDet)
                        {
                            entities.TermDet.Remove(v);
                        }
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }
    }
}
