
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">TrendAI</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground/60 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-foreground/60 hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link to="/pricing" className="text-foreground/60 hover:text-foreground transition-colors">
            Prezzi
          </Link>
          <Link to="/about" className="text-foreground/60 hover:text-foreground transition-colors">
            Chi Siamo
          </Link>
          <Link to="/admin" className="text-foreground/60 hover:text-foreground transition-colors">
            Admin
          </Link>
          <Button variant="outline" asChild>
            <Link to="/login">Accedi</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Inizia Ora</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
