CREATE TABLE [dbo].[Fabric_Requisition_Det]
(
	[Fabric_Req_Masid] [int] NULL,
	[Fabric_Req_detid] [int] IDENTITY(1,1) NOT NULL primary key,	
	[Itemid] [int] NULL,
	Colorid int null,
	Sizeid int null,
	ComboColorid int null,
	Uomid int null,
	LotNo varchar(25) null,
	BatchNo varchar(30) null,
	AvailStock numeric(15,5) null,
	FabricWt numeric(15,5) null,
	ReqWt numeric(15,5) null,
	IsChecked char(1)null,
	 CONSTRAINT [FK_Fabric_Requisition_Det] FOREIGN KEY ([Fabric_Req_Masid]) REFERENCES [Fabric_Requisition_Mas]([Fabric_Req_Masid]),
	 CONSTRAINT [FK_Fabric_Requisition_det_Item] FOREIGN KEY ([Itemid]) REFERENCES [Item]([itemid]),
	 CONSTRAINT [FK_Fabric_Requisition_det_Size] FOREIGN KEY ([Sizeid]) REFERENCES [Size]([Sizeid]),
	 	CONSTRAINT [FK_Fabric_Requisition_det_Color] FOREIGN KEY ([Colorid]) REFERENCES [Color]([Colorid]),
		CONSTRAINT [FK_Fabric_Requisition_det_ComboColor] FOREIGN KEY (ComboColorid) REFERENCES [Color]([Colorid]),
		CONSTRAINT [FK_Fabric_Requisition_det_Uom] FOREIGN KEY ([Uomid]) REFERENCES [Unit_of_measurement]([Uomid])
	
)
