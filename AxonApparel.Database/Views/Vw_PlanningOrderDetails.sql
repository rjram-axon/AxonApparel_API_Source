CREATE VIEW [dbo].[Vw_PlanningOrderDetails]
as
Select bmas.companyid,Company.Company, company.company_lookup CLookup,      
bmas.BuyerId,buyer.Buyer,City.City,      
bmas.order_no, bmas.Order_date, bmas.Ref_no,       
bsty.StyleRowid,bsty.Styleid, Style.Style, bsty.Quantity,Bsty.ProductionQty,  
Bsty.ProductionQty OrderQty
--,IsNull(OM.TransferID,0)TID
, isnull(bsty.Despatch_Closed,'N') Despatch_Closed,  
bmas.merchandiserid     
from Buy_Ord_Mas as bmas       
--Left Outer Join Order_Transfer_Mas OM On OM.Order_No=Bmas.Order_No      
inner join Buy_Ord_Style as bsty on bmas.Order_No = bsty.Order_No   
And IsNUll(Bsty.WorkOrder,'N')<>'N'       
inner join Style on bsty.Styleid = Style.Styleid       
inner join Company on bmas.CompanyID = Company.CompanyID       
inner join Buyer on bmas.buyerid = buyer.buyerid       
Inner Join Buyer_add On buyer_add.Buyer_addid = Bmas.Buyer_Addid        
Inner Join City On City.Id = Buyer_Add.Cityid        
    
