CREATE TABLE [dbo].[ColorCode]
(
	[ColorCodeId] INT NOT NULL PRIMARY KEY identity(1,1),
	ColorCode nvarchar(40) not null,
	ColorShade nvarchar(30) null ,
	ColorId int null,
	SupplierId int null,
	[IsActive] [bit]  DEFAULT (1) NOT NULL,
	CONSTRAINT [FK_ColorCode_Color] FOREIGN KEY ([ColorId]) REFERENCES [Color]([Colorid]), 
    CONSTRAINT [FK_ColorCode_Supplier] FOREIGN KEY (SupplierId) REFERENCES [Supplier]([SupplierId])

)
