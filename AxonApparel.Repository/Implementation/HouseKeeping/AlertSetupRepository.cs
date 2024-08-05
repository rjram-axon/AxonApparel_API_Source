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
using System.Data.Entity.Validation;

namespace AxonApparel.Repository
{
    public class AlertSetupRepository :IAlertSetupRepository
    {
        HouseKeepingEntities entities = new HouseKeepingEntities();




        public IEnumerable<Domain.AlertType> GetMainList(string Alerttype,int Alertid)
        {

            if (Alertid > 0)
            {

                var userdet = (from us in entities.AlertType.Where(c => c.AlertCategory == Alerttype && (c.AlertID == Alertid))
                               select new Domain.AlertType
                               {
                                   AlertID = us.AlertID,
                                   AlertName = us.AlertName,
                                   AlertCategory = us.AlertCategory

                               }).ToList();
                return userdet;
            }
            else {

                var userdet = (from us in entities.AlertType.Where(c => c.AlertCategory == Alerttype )
                               select new Domain.AlertType
                               {
                                   AlertID = us.AlertID,
                                   AlertName = us.AlertName,
                                   AlertCategory = us.AlertCategory

                               }).ToList();
                return userdet;
            }

            
        }

        public IEnumerable<Domain.AlertType> GetDDlList(string Alerttype)
        {
            var userdet = (from us in entities.AlertType.Where(c => c.AlertCategory == Alerttype)
                           select new Domain.AlertType
                          {
                              AlertID = us.AlertID,
                              AlertName = us.AlertName,
                              AlertCategory=us.AlertCategory

                          }).ToList();



            return userdet;
        }

        public IEnumerable<Domain.User_Grant_AlertRights> GetAlertEditbyid(int Alertid)
        {

            var settingdata = (from us in entities.Proc_Apparel_GetAlertrights(Alertid)
                               select new Domain.User_Grant_AlertRights
                               {
                                  AlertID = us.AlertID,
                                  AlertName = us.AlertName,
                                  EmployeeID=us.EmployeeID,
                                  Employee=us.Employee,
                                  Mail=us.Mail,
                                  Popup=us.Popup,
                                  SMS=us.SMS,
                                 
                               }).ToList();


            return settingdata;
        }


        public IEnumerable<Domain.User_Grant_AlertRights> GetAlertDetails(string Alertname, string Category, string Orderno)
        {

            var settingdata = (from us in entities.Proc_Apparel_GetusermailDet(Alertname, Category, Orderno)
                               select new Domain.User_Grant_AlertRights
                               {
                                   AlertID = us.AlertID,
                                   EmployeeID = us.EmployeeID,
                                   Employee = us.Employee,
                                   Mail = us.Mail,
                                   Popup = us.Popup,
                                   SMS = us.SMS,
                                   EmailAdd=us.Email
                               }).ToList();


            return settingdata;
        }

        public bool UpdateSetup(List<Repository.User_Grant_AlertRights> mainlistobj)
        {
            bool reserved = false;
            int Alertid = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    Alertid = (int)mainlistobj[0].AlertID;

                    var MDet = entities.User_Grant_AlertRights.Where(c => c.AlertID == Alertid).ToList(); ;
                    if (MDet != null)
                    {
                        foreach (var m in MDet)
                        {
                            entities.User_Grant_AlertRights.Remove(m);
                        }
                        entities.SaveChanges();
                    }
                    if (mainlistobj != null)
                    {
                        foreach (var a in mainlistobj)
                        {
                            entities.User_Grant_AlertRights.Add(a);
                        }
                        entities.SaveChanges();
                    }


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
